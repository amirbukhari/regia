/*
 * sync-legacy.mjs — generates web/src/legacy/generated/* from the mockup sources
 * at the repository root (../js, ../billing.css, ../index.html).
 *
 * The mockup is written as classic scripts sharing one global scope. To keep the
 * Next.js build byte-for-byte faithful, each file is converted into an ES module
 * that keeps its code verbatim and then attaches every top-level declaration to
 * `window`, so cross-file references keep resolving exactly as they did in the
 * mockup. Import order mirrors the <script> tag order in index.html.
 *
 * Run via `npm run sync:legacy` (wired into predev/prebuild).
 */
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, '..', '..');
const outDir = path.resolve(here, '..', 'src', 'legacy', 'generated');

// window properties we must never clobber
const DENYLIST = new Set([
  'name','length','status','top','parent','self','location','close','open',
  'print','focus','blur','history','event','origin','frames','opener','closed',
  'navigator','screen','document','window','alert','confirm','prompt','stop',
]);

const indexHtml = await readFile(path.join(repoRoot, 'index.html'), 'utf8');

/* ---- script order, straight from index.html ---- */
const scriptOrder = [...indexHtml.matchAll(/<script src="(js\/[^"?]+)(?:\?v=\d+)?"><\/script>/g)]
  .map((m) => m[1]);
if (scriptOrder.length < 60) {
  throw new Error(`Expected 60+ mockup scripts, found ${scriptOrder.length} — index.html markers changed?`);
}

/* ---- top-level declaration extraction ---- */
function topLevelNames(src) {
  const names = [];
  const re = /^(?:async\s+)?(?:function\s+([A-Za-z_$][\w$]*)|(?:const|let|var)\s+([A-Za-z_$][\w$]*))/gm;
  for (const m of src.matchAll(re)) {
    // only column-0 declarations (the mockup indents everything nested)
    names.push(m[1] || m[2]);
  }
  return [...new Set(names)];
}

/* run a DOMContentLoaded-style callback even if the document already loaded
   (legacy modules are imported after React mounts the shell) */
const ON_READY_HELPER =
  "const __dlxOnReady=(type,fn)=>{if(type!=='DOMContentLoaded')return document.addEventListener(type,fn);" +
  "if(document.readyState!=='loading')fn();else document.addEventListener('DOMContentLoaded',fn);};\n";

function mustReplace(src, from, to, file) {
  if (!src.includes(from)) throw new Error(`Marker not found in ${file}: ${from}`);
  return src.replace(from, to);
}

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

const importLines = [];
for (const rel of scriptOrder) {
  let src = await readFile(path.join(repoRoot, rel), 'utf8');

  if (rel === 'js/theme.js') {
    // module evaluation happens after DOMContentLoaded — route through a
    // ready-state-aware helper so the boot listener still runs
    src = ON_READY_HELPER + src.replaceAll(
      "document.addEventListener('DOMContentLoaded',",
      "__dlxOnReady('DOMContentLoaded',",
    );
  }
  if (rel === 'js/helpers.js') {
    // `current` is the one mutable global read across files (events/theme/
    // featureflags resolve it via window) — keep window in sync on every write
    src = mustReplace(src, "let current='dashboard';", "let current='dashboard';", rel);
    src = mustReplace(src, '\n  current=id;\n', '\n  current=id;window.current=current;\n', rel);
  }

  const names = topLevelNames(src).filter((n) => !n.startsWith('__dlx'));
  for (const n of names) {
    if (DENYLIST.has(n)) throw new Error(`Refusing to attach dangerous global "${n}" from ${rel}`);
  }
  const attach = names.length
    ? `\n\n/* [sync-legacy] expose top-level declarations as globals (mockup semantics) */\nObject.assign(window, { ${names.join(', ')} });\n`
    : '\n';

  const flat = rel.replace(/^js\//, '').replaceAll('/', '__');
  await writeFile(
    path.join(outDir, flat),
    `/* AUTO-GENERATED from ${rel} — do not edit; run \`npm run sync:legacy\` */\n${src}${attach}`,
  );
  importLines.push(`import './generated/${flat}';`);
}

/* ---- boot module: imports in script-tag order ---- */
await writeFile(
  path.resolve(outDir, '..', 'boot.js'),
  `/* AUTO-GENERATED — imports the mockup scripts in their original <script> order */\n${importLines.join('\n')}\n`,
);

/* ---- billing.css (verbatim copy) ---- */
const css = await readFile(path.join(repoRoot, 'billing.css'), 'utf8');
await writeFile(path.resolve(here, '..', 'app', 'billing.css'), css);

/* ---- delonix logo <symbol> (huge inline path data) ---- */
const logoStart = indexHtml.indexOf('<svg xmlns="http://www.w3.org/2000/svg" style="display:none"');
const logoEnd = indexHtml.indexOf('</svg>', logoStart) + '</svg>'.length;
if (logoStart < 0) throw new Error('logo symbol markers not found in index.html');
const logoSvg = indexHtml.slice(logoStart, logoEnd);
const logoInner = logoSvg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
await writeFile(
  path.resolve(outDir, 'logoSymbol.js'),
  `/* AUTO-GENERATED from index.html — inner markup of the hidden #dlx-logo <svg> */\nexport const LOGO_SYMBOL_INNER = ${JSON.stringify(logoInner)};\n`,
);

console.log(`sync-legacy: ${scriptOrder.length} modules, billing.css and logo symbol regenerated.`);
