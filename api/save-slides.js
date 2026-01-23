// Vercel Serverless Function to save slide audience tags
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Basic auth check - you can add password protection here
  const authHeader = req.headers.authorization;
  const expectedAuth = `Bearer ${process.env.ADMIN_PASSWORD || 'changeme'}`;

  if (authHeader !== expectedAuth) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { slides } = req.body;

    if (!slides || !Array.isArray(slides)) {
      return res.status(400).json({ error: 'Invalid slides data' });
    }

    // Format the slides data as a JS file
    const fileContent = `export const slides = ${JSON.stringify(slides, null, 2)};`;

    // GitHub API setup
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const REPO_OWNER = process.env.REPO_OWNER || 'bpollak';
    const REPO_NAME = process.env.REPO_NAME || 'tritongpt-deck';
    const FILE_PATH = 'src/data/slides.js';
    const BRANCH = 'main';

    if (!GITHUB_TOKEN) {
      return res.status(500).json({ error: 'GitHub token not configured' });
    }

    // Get current file SHA (required for updates)
    const getFileResponse = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=${BRANCH}`,
      {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );

    if (!getFileResponse.ok) {
      return res.status(500).json({ error: 'Failed to fetch current file' });
    }

    const fileData = await getFileResponse.json();
    const currentSha = fileData.sha;

    // Update the file
    const updateResponse = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Update slide audience tags via admin panel',
          content: Buffer.from(fileContent).toString('base64'),
          sha: currentSha,
          branch: BRANCH
        })
      }
    );

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
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
