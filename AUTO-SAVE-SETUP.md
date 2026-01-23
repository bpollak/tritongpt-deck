# Auto-Save Setup Guide

This guide will help you set up automatic slide saving and deployment.

## What You'll Get

- Visit `/manage` to edit slide audiences
- Click "Save & Deploy" button
- Changes automatically commit to GitHub
- Vercel auto-deploys (1-2 minutes)
- No manual file editing needed!

## Setup Steps

### 1. Create GitHub Personal Access Token

1. Go to GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Click **"Generate new token (classic)"**
3. Give it a name: `Presentation Manager`
4. Set expiration: `No expiration` (or your preference)
5. Select scopes:
   - ✅ **repo** (full control of private repositories)
6. Click **"Generate token"**
7. **Copy the token** (you won't be able to see it again!)

### 2. Add Environment Variables to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: **tritongpt-deck**
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `GITHUB_TOKEN` | `ghp_xxxxxxxxxxxx` | Your PAT from step 1 |
| `REPO_OWNER` | `bpollak` | Your GitHub username |
| `REPO_NAME` | `tritongpt-deck` | Your repo name |
| `ADMIN_PASSWORD` | `your-secure-password` | Password to protect the API |

5. Click **"Save"** for each variable

### 3. Deploy the Changes

```bash
cd /Users/bpollak/Documents/presentation-test/ucsd-presentation
git add -A
git commit -m "Add auto-save slide manager"
git push origin main
```

Vercel will automatically deploy with the new environment variables.

### 4. Test It Out

1. Visit: `https://tritongpt-deck.vercel.app/manage`
2. Edit some slide audiences
3. Click **"Save & Deploy"**
4. Enter your admin password when prompted
5. Wait 1-2 minutes for deployment
6. Test the filtered views: `?audience=internal`, `?audience=technical`, etc.

## How It Works

```
User edits tags → Clicks "Save & Deploy" → Enters password
   ↓
Frontend calls /api/save-slides with slide data
   ↓
API authenticates with password
   ↓
API commits to GitHub using Personal Access Token
   ↓
Vercel detects commit → Auto-deploys
   ↓
Changes go live in 1-2 minutes!
```

## Security Notes

- The `/manage` page is not linked from the presentation - only you know the URL
- Admin password protects the API endpoint
- GitHub token is stored securely in Vercel environment variables
- Token never exposed to frontend/browser

## Accessing the Manager

- **Local development**: `http://localhost:5174/manage`
- **Production**: `https://tritongpt-deck.vercel.app/manage`

## Troubleshooting

**"Unauthorized" error:**
- Check that `ADMIN_PASSWORD` is set in Vercel
- Make sure you're entering the correct password

**"Failed to save" error:**
- Verify `GITHUB_TOKEN` has `repo` scope
- Check token hasn't expired
- Verify `REPO_OWNER` and `REPO_NAME` are correct

**Changes not appearing:**
- Wait 1-2 minutes for Vercel deployment
- Check Vercel deployment logs
- Refresh the page after deployment completes

## Fallback: Manual Export

If auto-save isn't working, you can still use the manual export:
1. Go to `/manage`
2. Edit tags
3. The "Copy to Clipboard" and "Download" buttons won't show in standalone mode
4. Temporarily visit the presentation and click the (removed) settings icon
   - Or manually copy the updated configuration from browser console

For support, check Vercel deployment logs or GitHub Actions.
