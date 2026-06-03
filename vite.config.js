import fs from 'node:fs/promises'
import path from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import vm from 'node:vm'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { AUDIENCE_TYPES } from './src/data/audiences.js'
import {
  applySlideManagerState,
  buildSlideManagerStateFromSlides,
  createSlideManagerStateModuleContent,
  validateSlideManagerState
} from './src/data/slideManagerStateUtils.js'
import { validateSlides, writeSlideArtifacts } from './scripts/lib/slideArtifacts.mjs'

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

const readSlidesFromDisk = async (slidesSourcePath) => {
  const source = await fs.readFile(slidesSourcePath, 'utf8')
  try {
    const context = { globalThis: {} }
    vm.createContext(context)
    vm.runInContext(
      source.replace(/export\s+const\s+slides\s*=\s*/, 'globalThis.__slides = '),
      context,
      { timeout: 1000 }
    )

    if (!Array.isArray(context.globalThis.__slides)) {
      throw new Error('slides export is not an array')
    }

    return context.globalThis.__slides
  } catch {
    throw new Error('Could not parse src/data/slides.js — expected `export const slides = [...]`')
  }
}

const saveSlidesLocally = async (incomingSlides) => {
  const slidesSourcePath = path.join(rootDir, 'src/data/slides.js')
  const slideManagerStatePath = path.join(rootDir, 'src/data/slideManagerState.js')

  // Re-read slide content from disk and persist only manager-owned state. This
  // prevents a stale panel snapshot from reverting code-side slide edits.
  const diskSlides = await readSlidesFromDisk(slidesSourcePath)
  const nextState = buildSlideManagerStateFromSlides(diskSlides, incomingSlides)
  const stateErrors = validateSlideManagerState(diskSlides, nextState, { allowedAudiences: AUDIENCE_TYPES })

  if (stateErrors.length > 0) {
    const error = new Error('Slide manager state validation failed')
    error.validationErrors = stateErrors
    throw error
  }

  const mergedSlides = applySlideManagerState(diskSlides, nextState)
  const errors = await validateSlides(mergedSlides, { rootDir })

  if (errors.length > 0) {
    const error = new Error('Slide validation failed')
    error.validationErrors = errors
    throw error
  }

  await fs.writeFile(slideManagerStatePath, createSlideManagerStateModuleContent(nextState), 'utf8')
  await writeSlideArtifacts(rootDir, mergedSlides)
}

const commitAndPushSlides = async () => {
  const trackedFile = 'src/data/slideManagerState.js'
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
  await runGit(['commit', '-m', 'Update slide deck via local admin panel', '--', trackedFile])

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
            message: 'Saved to src/data/slideManagerState.js and refreshed the local deployment artifacts.'
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
  optimizeDeps: {
    exclude: ['jspdf'],
  },
})
