# ucsd-presentation (TritonGPT deck)

## HARD RULE: never run processes inside this iCloud directory
This repo lives under `~/Documents`, which is iCloud Drive. iCloud evicts files
("dataless") and any read of one blocks forever, so `vite`, `npm`, `node`, tests,
and builds run here hang silently. Do not run them here. No exceptions, no
"just this once", no `brctl download` workarounds.

- Edit source files here. Run everything through `scripts/run-outside-icloud.sh`,
  which mirrors the repo (git tree + local edits, evicted files skipped) to
  `~/dev/tritongpt-deck-run`, installs deps there, and execs the command there.
  - Dev server from a terminal: `scripts/run-outside-icloud.sh` (defaults to `npm run dev`).
  - Browser-pane preview (desktop app): that process cannot read `~/Documents` at all,
    so first run `scripts/run-outside-icloud.sh sync` from Bash, then start the `dev`
    entry in `.claude/launch.json`, which runs `npm run dev` inside the mirror.
    Re-run `sync` after every edit you want to see (HMR picks it up).
  - Build: `scripts/run-outside-icloud.sh npm run build`
  - Any script: `scripts/run-outside-icloud.sh node scripts/whatever.mjs`
- Git commands are fine here (objects are local). Deploys go through GitHub, then Vercel.
- If a file you need is evicted, `ls -lO <file>` shows `dataless`. Read it from git
  (`git show HEAD:<path>`) instead of the working copy.

See `AI_CONTEXT.md` for the app architecture and `AGENTS.md` for the same rule.
