# Slide library

Open `/manage` on the local or published application.

## Find and preview

- Search titles, topics, references, or text within a slide. Multiple search words must all match.
- Choose **Entire library** to see every managed slide, or choose **Default presentation** or another audience to see its assigned slides.
- The list stays in shared deck order. The number on each thumbnail is its position in the entire library.
- Select a thumbnail to open that exact slide with a compatible audience link.
- Select a row’s title or **Details & audiences** with a mouse, Enter, or Space to expand it. Technical references and layout names are under **Slide reference and layout**.
- New slides without a current thumbnail show an **Open slide preview** fallback. Maintainers regenerate thumbnails with `npm run thumbnails` after content or layout changes.

## Export

PDF and PowerPoint include exactly the slides currently in the list, in that order. Both the presentation selector and text search narrow the export. Counts appear on the export buttons and in the scope description. Clear the search to export the full selected presentation.

**Preview full presentation** opens the complete audience deck, not the search results. Its label states the full count. Entire library has no equivalent shared audience link.

## Change the shared library

Expand a slide to edit its audience assignments. The up/down buttons move it one position in the entire library, including when search or audience filters hide neighboring slides. The remove button removes it from the entire library, after confirmation. These actions affect shared ordering or assignments, not an independent event deck. At least one audience remains selected.

On localhost, changes are mirrored to browser-local preview state. **Save to Repo** writes `src/data/slideManagerState.js`. **Push to GitHub** separately confirms the manager-owned change before committing and pushing it. Published manager changes remain in the current page until pushed with the configured admin password.

**Copy to Clipboard** and **Download State** contain the complete manager state, independently of text search or the presentation filter. They belong in `src/data/slideManagerState.js`; never replace `src/data/slides.js` with this output. PDF and PowerPoint exports do not save or publish configuration changes.

## Verification

`npm run check:deck` validates source IDs, stable slugs, audience tags, and local media references, then regenerates ignored deployment data. `npm run build` produces the app. `npm test` and `npm run test:browser` cover library selection, routing, navigation, mobile reading, and document export behavior. `npm run check:thumbnails` detects missing or outdated content previews.

Publication follows the existing human approval process. A successful GitHub save is not proof that the production deployment is live. Verify the resulting production link after deployment.
