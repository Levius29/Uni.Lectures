// Verifica che le copie di impeccable per Claude e Codex siano allineate e non modificate a mano.
// node scripts/check-skills.mjs            controlla
// node scripts/check-skills.mjs --write R  registra l'impronta dopo scripts/sync-impeccable.sh (R = revisione upstream)
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const LOCK = 'docs/third-party-licenses/impeccable.lock.json';
const CODEX = '.agents/skills/impeccable';
const CLAUDE = '.claude/skills/impeccable';
const CLAUDE_AGENTS = '.claude/agents';

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
}

function treeHash(paths, base) {
  const hash = createHash('sha256');
  for (const path of [...paths].sort()) {
    hash.update(relative(base, path)).update('\0').update(readFileSync(path)).update('\0');
  }
  return hash.digest('hex');
}

const skillVersion = (dir) => readFileSync(join(dir, 'SKILL.md'), 'utf8').match(/^\s*version:\s*(\S+)/m)?.[1];
const engineVersion = (dir) => readFileSync(join(dir, 'scripts/VERSION'), 'utf8').trim();
const claudeAgentFiles = () => readdirSync(CLAUDE_AGENTS).filter((f) => /^impeccable-.*\.md$/.test(f)).map((f) => join(CLAUDE_AGENTS, f));
const claudeAgents = () => claudeAgentFiles().map((f) => f.slice(CLAUDE_AGENTS.length + 1, -3).replaceAll('-', '_')).sort();
const codexAgents = () => readdirSync(join(CODEX, 'agents')).filter((f) => f.endsWith('.toml')).map((f) => f.slice(0, -5)).sort();

const state = {
  skillVersion: skillVersion(CODEX),
  engineVersion: engineVersion(CODEX),
  codex: treeHash(files(CODEX), CODEX),
  claude: treeHash([...files(CLAUDE), ...claudeAgentFiles()], '.claude'),
};

const errors = [];
if (skillVersion(CLAUDE) !== state.skillVersion) errors.push(`versione skill diversa: Codex ${state.skillVersion}, Claude ${skillVersion(CLAUDE)}`);
if (engineVersion(CLAUDE) !== state.engineVersion) errors.push(`versione engine diversa: Codex ${state.engineVersion}, Claude ${engineVersion(CLAUDE)}`);
if (codexAgents().join() !== claudeAgents().join()) errors.push(`agenti diversi: Codex [${codexAgents()}], Claude [${claudeAgents()}]`);

if (process.argv[2] === '--write') {
  if (errors.length) throw new Error(errors.join('\n'));
  writeFileSync(LOCK, `${JSON.stringify({ upstream: 'pbakaus/impeccable', revision: process.argv[3], ...state }, null, 2)}\n`);
  process.exit(0);
}

if (!existsSync(LOCK)) errors.push(`manca ${LOCK}: esegui scripts/sync-impeccable.sh`);
else {
  const lock = JSON.parse(readFileSync(LOCK, 'utf8'));
  if (lock.codex !== state.codex) errors.push(`${CODEX} è stata modificata a mano: aggiorna solo con scripts/sync-impeccable.sh`);
  if (lock.claude !== state.claude) errors.push(`${CLAUDE} o gli agenti in ${CLAUDE_AGENTS} sono stati modificati a mano: aggiorna solo con scripts/sync-impeccable.sh`);
}

if (errors.length) {
  console.error(`impeccable non sincronizzata:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`impeccable sincronizzata (skill ${state.skillVersion}, engine ${state.engineVersion}, agenti ${codexAgents().length})`);
