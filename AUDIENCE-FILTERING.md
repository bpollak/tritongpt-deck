# Audience-based presentations

Open the deck with a complete link such as `https://tritongpt-deck.vercel.app/?audience=technical#slide=tritongpt-platform`.

A missing or unknown audience tag shows a link-help message. Valid tags are case-insensitive: `all`, `technical`, `executive`, `cabinet`, `citizen`, `internal`, `public`, `conference`, `PK`, `regent`, and `LMU`. Cabinet is reserved and currently contains no slides.

`all` means **Default presentation**. It includes only slides explicitly assigned that tag. It does not automatically include every slide, and slides tagged `all` are not automatically included in other presentations.

The manager at `/manage` also offers **Entire library**, containing every managed slide. This is a management and export selection, not a shareable audience URL. Choose a named presentation to preview its full audience link. The preview link states its full slide count even when text search narrows the manager’s rows.

Slide content lives in `src/data/slides.js`. Canonical order, removal, and audience assignments live in `src/data/slideManagerState.js`. Preserve the audience contracts and stable slugs when editing these files. Audience tags organize presentations; they are not authentication or a substitute for protected hosting.
