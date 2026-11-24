// docs/apis.md from apis.json, the one source of the API catalogue.
//   node tools/catalogue.mjs           write docs/apis.md
//   node tools/catalogue.mjs --check   exit 1 when docs/apis.md is not what apis.json says (CI)
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const path = (p) => fileURLToPath(new URL(p, import.meta.url));
const { about, priorities, apis } = JSON.parse(readFileSync(path('../apis.json'), 'utf8'));

const problems = [];
const ids = new Set();
for (const a of apis) {
  if (!/^[a-z][a-z0-9-]*$/.test(a.id)) problems.push(`id "${a.id}" is not kebab-case`);
  if (ids.has(a.id)) problems.push(`id "${a.id}" is listed twice`);
  ids.add(a.id);
  if (!(a.priority in priorities)) problems.push(`${a.id}: unknown priority "${a.priority}"`);
  if (!a.title || !a.native) problems.push(`${a.id}: a title and what only native gives are required`);
}
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }

const cell = (s) => (s ?? '—').replaceAll('|', '\\|');
const section = ([p, what]) => {
  const rows = apis.filter((a) => a.priority === p);
  return `## ${p}: ${what}\n\n| API | Id | The web already gives | Only native gives | Status |\n|---|---|---|---|---|\n` +
    rows.map((a) => `| ${cell(a.title)} | \`${a.id}\` | ${cell(a.web)} | ${cell(a.native)} | ${a.status} |`).join('\n') + '\n';
};
const text = `# The device APIs

<!-- Generated from apis.json by tools/catalogue.mjs: edit apis.json, not this file. -->

${about.split(':')[0].trim()}. ${apis.length} APIs in ${Object.keys(priorities).length} groups; each is a typed F# module, a JS glue module that uses the web's own API where there is one, and a native
implementation where there is not (see [contract.md](contract.md)). **Nothing is implemented yet**: every status is \`planned\`.

${Object.entries(priorities).map(section).join('\n')}`;

const out = path('../docs/apis.md');
if (process.argv.includes('--check')) {
  let current = ''; try { current = readFileSync(out, 'utf8'); } catch {}
  if (current !== text) { console.error('docs/apis.md is not current: run `node tools/catalogue.mjs`'); process.exit(1); }
  console.log(`docs/apis.md is current (${apis.length} APIs)`);
} else {
  writeFileSync(out, text);
  console.log(`docs/apis.md written (${apis.length} APIs)`);
}
