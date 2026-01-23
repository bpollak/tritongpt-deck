# Slide Manager Interface

A visual interface for managing which audiences can see which slides.

## How to Use

### Opening the Slide Manager

1. **During Development**: Visit `http://localhost:5174` (or your dev server URL)
2. Click the **Settings icon** (⚙️) in the top-right corner of the presentation
3. The Slide Manager modal will open

### Managing Slide Audiences

**Filter Slides:**
- Click any audience badge at the top (all, technical, executive, internal, public)
- The list will show only slides visible to that audience

**Edit a Slide:**
1. Click on any slide in the list to expand it
2. Toggle audience tags on/off by clicking the buttons
3. Active audiences show with an eye icon (👁️) and are colored
4. Inactive audiences show with a crossed eye icon and are gray
5. At least one audience must always be selected

**Audience Color Coding:**
- **Gray**: all (default)
- **Blue**: technical
- **Purple**: executive
- **Green**: internal
- **Orange**: public

### Exporting Your Changes

Once you've configured the slides:

**Option 1: Copy to Clipboard**
1. Click "Copy to Clipboard" button
2. Open `src/data/slides.js` in your editor
3. Replace the entire contents with the copied content
4. Save the file

**Option 2: Download File**
1. Click "Download slides.js" button
2. The file will download to your Downloads folder
3. Move it to `src/data/slides.js` (replacing the old one)

### Quick Examples

**Hide a slide from default view:**
- Expand the slide
- Turn OFF "all"
- Turn ON specific audiences (e.g., "internal")

**Make a slide visible to everyone:**
- Expand the slide
- Turn ON "all"

**Create a technical-only section:**
- Filter by "technical" to see what's currently visible
- Adjust slides to have only "technical" audience

## Tips

- The interface works in real-time but doesn't save automatically
- Use the filter to verify what each audience will see
- Always export when done to save your changes
- The slide counter shows how many slides match the current filter

## Deployment

After making changes:
1. Export and save the new `slides.js` file
2. Commit the changes: `git add src/data/slides.js && git commit -m "Update slide audiences"`
3. Push to deploy: `git push origin main`

Your changes will go live on Vercel automatically.
