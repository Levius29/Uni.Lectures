#!/usr/bin/env bash
# Aggiorna insieme le due copie di impeccable (Claude e Codex) dalla stessa revisione upstream.
# Uso: scripts/sync-impeccable.sh [ref]   (ref = branch, tag o commit di pbakaus/impeccable; default main)
set -euo pipefail

REF="${1:-main}"
ROOT="$(git rev-parse --show-toplevel)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

git clone -q --filter=blob:none --no-checkout https://github.com/pbakaus/impeccable "$TMP/src"
git -C "$TMP/src" sparse-checkout set --no-cone /.claude/skills/ /.claude/agents/ /.agents/skills/ /LICENSE
git -C "$TMP/src" checkout -q "$REF"
REV="$(git -C "$TMP/src" rev-parse HEAD)"

cd "$ROOT"
rm -rf .agents/skills/impeccable .claude/skills/impeccable .claude/agents/impeccable-*.md
mkdir -p .claude/agents
cp -R "$TMP/src/.agents/skills/impeccable" .agents/skills/
cp -R "$TMP/src/.claude/skills/impeccable" .claude/skills/
cp "$TMP/src/.claude/agents/"impeccable-*.md .claude/agents/
cp "$TMP/src/LICENSE" docs/third-party-licenses/impeccable-LICENSE

node scripts/check-skills.mjs --write "$REV"
echo "impeccable sincronizzata a $REV. Aggiorna la riga in docs/third-party-licenses/NOTICE.md, poi commit."
