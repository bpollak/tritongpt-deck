// Vercel Serverless Function to save slide audience tags, order, and removals.
import vm from 'node:vm';

import { AUDIENCE_TYPES } from '../src/data/audiences.js';
import {
  buildSlideManagerStateFromSlides,
  createSlideManagerStateModuleContent,
  validateSlideManagerState
} from '../src/data/slideManagerStateUtils.js';

const decodeGitHubFile = (fileData) => Buffer.from(fileData.content || '', 'base64').toString('utf8');

const parseSlidesModule = (source) => {
  try {
    const context = { globalThis: {} };
    vm.createContext(context);
    vm.runInContext(
      source.replace(/export\s+const\s+slides\s*=\s*/, 'globalThis.__slides = '),
      context,
      { timeout: 1000 }
    );

    if (!Array.isArray(context.globalThis.__slides)) {
      throw new Error('slides export is not an array');
    }

    return context.globalThis.__slides;
  } catch (error) {
    throw new Error('Could not parse src/data/slides.js');
  }
};

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return res.status(500).json({ error: 'ADMIN_PASSWORD is not configured on the server' });
  }

  // Basic auth check
  const authHeader = req.headers.authorization;
  const expectedAuth = `Bearer ${adminPassword}`;

  if (!authHeader) {
    return res.status(401).json({ error: 'Missing authorization header' });
  }

  if (authHeader !== expectedAuth) {
    return res.status(401).json({ error: 'Unauthorized: invalid admin password' });
  }

  try {
    const { slides } = req.body;

    if (!slides || !Array.isArray(slides)) {
      return res.status(400).json({ error: 'Invalid slides data' });
    }

    // GitHub API setup
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const REPO_OWNER = process.env.REPO_OWNER || 'bpollak';
    const REPO_NAME = process.env.REPO_NAME || 'tritongpt-deck';
    const SLIDES_FILE_PATH = 'src/data/slides.js';
    const STATE_FILE_PATH = 'src/data/slideManagerState.js';
    const BRANCH = 'main';

    if (!GITHUB_TOKEN) {
      return res.status(500).json({ error: 'GITHUB_TOKEN is not configured on the server' });
    }

    const getRepoFile = async (filePath, { required = true } = {}) => {
      const response = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}?ref=${BRANCH}`,
        {
          headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      );

      if (!response.ok) {
        if (!required && response.status === 404) return null;
        throw new Error(`Failed to fetch ${filePath}`);
      }

      return response.json();
    };

    const slidesFileData = await getRepoFile(SLIDES_FILE_PATH);
    const stateFileData = await getRepoFile(STATE_FILE_PATH, { required: false });
    const baseSlides = parseSlidesModule(decodeGitHubFile(slidesFileData));
    const nextState = buildSlideManagerStateFromSlides(baseSlides, slides);
    const validationErrors = validateSlideManagerState(baseSlides, nextState, { allowedAudiences: AUDIENCE_TYPES });

    if (validationErrors.length > 0) {
      return res.status(400).json({
        error: 'Slide manager state validation failed',
        details: validationErrors
      });
    }

    const fileContent = createSlideManagerStateModuleContent(nextState);
    const body = {
      message: 'Update slide manager state via admin panel',
      content: Buffer.from(fileContent).toString('base64'),
      branch: BRANCH
    };

    if (stateFileData?.sha) {
      body.sha = stateFileData.sha;
    }

    // Update the manager-owned state file. Slide content stays in src/data/slides.js.
    const updateResponse = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${STATE_FILE_PATH}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    );

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
      if (errorData?.message?.includes('Resource not accessible by personal access token')) {
        return res.status(500).json({
          error: 'Failed to update file: GITHUB_TOKEN lacks Contents write permission for this repository',
          details: errorData
        });
      }
      return res.status(500).json({ error: 'Failed to update file', details: errorData });
    }

    const result = await updateResponse.json();

    return res.status(200).json({
      success: true,
      message: 'Slides updated successfully',
      commit: result.commit.sha
    });

  } catch (error) {
    console.error('Error saving slides:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
