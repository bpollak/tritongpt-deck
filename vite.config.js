import fs from 'node:fs/promises'
import path from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createSlidesModuleContent, validateSlides, writeSlideArtifacts } from './scripts/lib/slideArtifacts.mjs'

const runExecFile = promisify(execFile)
const rootDir = process.cwd()

const readJsonBody = (req) => new Promise((resolve, reject) => {
  let rawBody = ''

  req.on('data', (chunk) => {
    rawBody += chunk
  })

  req.on('end', () => {
    try {
      resolve(rawBody ? JSON.parse(rawBody) : {})
    } catch (error) {
      reject(error)
    }
  })

  req.on('error', reject)
})

const sendJson = (res, statusCode, payload) => {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

const runGit = async (args) => {
  return runExecFile('git', args, { cwd: rootDir })
}

// Fields the admin panel is allowed to write. Everything else on each slide
// is preserved from the on-disk source so concurrent code edits to unrelated
// fields (title, content, stats, etc.) are never clobbered by a stale panel
// snapshot.
const PANEL_OWNED_FIELDS = ['audiences']

const readSlidesFromDisk = async (slidesSourcePath) => {
  const source = await fs.readFile(slidesSourcePath, 'utf8')
  const match = source.match(/export const slides\s*=\s*(\[[\s\S]*\]);?\s*$/)
  if (!match) {
    throw new Error('Could not parse src/data/slides.js — expected `export const slides = [...]`')
  }
  return JSON.parse(match[1])
}

const mergePanelFields = (diskSlides, incomingSlides) => {
  const incomingById = new Map(
    incomingSlides.map((slide) => [String(slide.id), slide])
  )

  return diskSlides.map((diskSlide) => {
    const incoming = incomingById.get(String(diskSlide.id))
    if (!incoming) return diskSlide

    const merged = { ...diskSlide }
    for (const field of PANEL_OWNED_FIELDS) {
      if (Object.prototype.hasOwnProperty.call(incoming, field)) {
        merged[field] = incoming[field]
      }
    }
    return merged
  })
}

const saveSlidesLocally = async (incomingSlides) => {
  const slidesSourcePath = path.join(rootDir, 'src/data/slides.js')

  // Re-read the current source from disk and merge only panel-owned fields.
  // This prevents a stale in-memory snapshot from the admin panel from
  // reverting code-side edits to text/content/stats.
  const diskSlides = await readSlidesFromDisk(slidesSourcePath)
  const mergedSlides = mergePanelFields(diskSlides, incomingSlides)

  const errors = await validateSlides(mergedSlides, { rootDir })

  if (errors.length > 0) {
    const error = new Error('Slide validation failed')
    error.validationErrors = errors
    throw error
  }

  await fs.writeFile(slidesSourcePath, createSlidesModuleContent(mergedSlides), 'utf8')
  await writeSlideArtifacts(rootDir, mergedSlides)
}

const commitAndPushSlides = async () => {
  const trackedFile = 'src/data/slides.js'
  const { stdout: statusOutput } = await runGit(['status', '--short', '--', trackedFile])

  if (!statusOutput.trim()) {
    return {
      pushed: false,
      commit: null,
      branch: null,
      message: 'Slides were saved locally. GitHub push skipped because there were no git changes to commit.'
    }
  }

  await runGit(['add', trackedFile])
  await runGit(['commit', '-m', 'Update slide audiences via local admin panel', '--', trackedFile])

  const { stdout: commitOutput } = await runGit(['rev-parse', '--short', 'HEAD'])
  const { stdout: branchOutput } = await runGit(['branch', '--show-current'])

  await runGit(['push', 'origin', 'HEAD'])

  return {
    pushed: true,
    commit: commitOutput.trim(),
    branch: branchOutput.trim(),
    message: `Saved locally and pushed commit ${commitOutput.trim()} to ${branchOutput.trim()}.`
  }
}

const localSlideApiPlugin = () => ({
  name: 'local-slide-api',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use('/api/local-slides', async (req, res) => {
      if (req.method !== 'POST') {
        sendJson(res, 405, { error: 'Method not allowed' })
        return
      }

      try {
        const { slides, pushToGitHub = false } = await readJsonBody(req)

        if (!Array.isArray(slides)) {
          sendJson(res, 400, { error: 'Invalid slides data' })
          return
        }

        await saveSlidesLocally(slides)

        if (!pushToGitHub) {
          sendJson(res, 200, {
            success: true,
            savedLocally: true,
            pushed: false,
            message: 'Saved to src/data/slides.js and refreshed the local deployment artifacts.'
          })
          return
        }

        const pushResult = await commitAndPushSlides()
        sendJson(res, 200, {
          success: true,
          savedLocally: true,
          ...pushResult
        })
      } catch (error) {
        if (error.validationErrors) {
          sendJson(res, 400, {
            error: 'Slide validation failed',
            details: error.validationErrors
          })
          return
        }

        sendJson(res, 500, {
          error: 'Local slide save failed',
          details: error.stderr || error.message
        })
      }
    })
  }
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localSlideApiPlugin()],
  base: '/',
})
