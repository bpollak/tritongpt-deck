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

const saveSlidesLocally = async (slides) => {
  const errors = await validateSlides(slides, { rootDir })

  if (errors.length > 0) {
    const error = new Error('Slide validation failed')
    error.validationErrors = errors
    throw error
  }

  const slidesSourcePath = path.join(rootDir, 'src/data/slides.js')
  await fs.writeFile(slidesSourcePath, createSlidesModuleContent(slides), 'utf8')
  await writeSlideArtifacts(rootDir, slides)
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
