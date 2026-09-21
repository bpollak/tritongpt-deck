#!/bin/bash
# Run any project command (vite dev, build, node scripts, tests) from a mirror of
# this repo that lives OUTSIDE iCloud Drive.
#
# Why: ~/Documents is iCloud-synced. iCloud evicts files ("dataless") and reads
# then block forever, which silently hangs vite/npm. Rule for every agent and
# person: never run processes inside the iCloud copy. Edit here, run there.
#
# Usage:  scripts/run-outside-icloud.sh [command...]      (default: npm run dev)
#         scripts/run-outside-icloud.sh sync                (mirror + deps only, no command)
#         DECK_RUN_DIR=/some/path scripts/run-outside-icloud.sh npm run build
#
# Note: the desktop app's Browser-pane preview process cannot read ~/Documents
# (macOS privacy control), so .claude/launch.json runs `npm run dev` directly in
# the mirror. Run `scripts/run-outside-icloud.sh sync` from a terminal or the
# agent's Bash tool after editing, then start or reload the preview.
set -euo pipefail
export PATH="/opt/homebrew/opt/node@22/bin:/opt/homebrew/bin:$PATH"

SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MIRROR="${DECK_RUN_DIR:-$HOME/dev/tritongpt-deck-run}"
mkdir -p "$MIRROR"
cd "$SRC"

echo "[run-outside-icloud] source: $SRC" >&2
echo "[run-outside-icloud] mirror: $MIRROR" >&2

# 1. Tracked files straight from git objects (never touches evicted working files).
git archive HEAD | tar -x -C "$MIRROR"

# 2. Overlay local edits: modified + untracked (not ignored), skipping evicted files.
git status --porcelain --untracked-files=all -z \
  | tr '\0' '\n' \
  | while IFS= read -r line; do
      [ -n "$line" ] || continue
      status="${line:0:2}"; path="${line:3}"
      case "$path" in *" -> "*) path="${path##* -> }";; esac
      if [[ "$status" == *D* ]]; then rm -f "$MIRROR/$path"; continue; fi
      [ -f "$path" ] || continue
      if ls -lO "$path" 2>/dev/null | grep -q dataless; then
        echo "[run-outside-icloud] skip (iCloud-evicted): $path" >&2; continue
      fi
      printf '%s\n' "$path"
    done \
  | rsync -a --files-from=- "$SRC/" "$MIRROR/"

# 3. Install deps in the mirror only when the lockfile changes.
LOCK_SHA="$(shasum -a 256 package-lock.json | cut -d' ' -f1)"
if [ ! -d "$MIRROR/node_modules" ] || [ "$(cat "$MIRROR/.lock.sha" 2>/dev/null)" != "$LOCK_SHA" ]; then
  echo "[run-outside-icloud] installing dependencies in mirror" >&2
  (cd "$MIRROR" && npm ci --no-audit --no-fund) && echo "$LOCK_SHA" > "$MIRROR/.lock.sha"
fi

# 4. Run the command from the mirror.
if [ "${1:-}" = "sync" ]; then echo "[run-outside-icloud] sync complete" >&2; exit 0; fi
cd "$MIRROR"
if [ "$#" -eq 0 ]; then set -- npm run dev; fi
echo "[run-outside-icloud] exec: $*" >&2
exec "$@"
