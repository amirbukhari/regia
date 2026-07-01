import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const jsFiles = [];
function walk(dir){
  for (const name of readdirSync(dir)) {
    if (['node_modules','.git','dist','build'].includes(name)) continue;
    const path = join(dir,name);
    const st = statSync(path);
    if (st.isDirectory()) walk(path);
    else if (path.endsWith('.js') || path.endsWith('.html')) jsFiles.push(path);
  }
}
walk(root);
const text = jsFiles.map(f=>readFileSync(f,'utf8')).join('\n');
const used = [...text.matchAll(/data-act=["']([^"']+)["']/g)].map(m=>m[1]).filter(a=>!a.includes('$' + '{'));
const handled = [...text.matchAll(/a===["']([^"']+)["']/g)].map(m=>m[1]);
const unhandled = [...new Set(used.filter(a=>!handled.includes(a)))].sort();
const navText = readFileSync(join(root,'js/data.js'),'utf8');
const navBlock = navText.split('/* ---- demo data ---- */')[0];
const viewText = jsFiles.filter(f=>f.includes('/js/views/') || f.endsWith('/js/featureMatrixData.js')).map(f=>readFileSync(f,'utf8')).join('\n');
const navRoutes = [...navBlock.matchAll(/id:'([^']+)'/g)].map(m=>m[1]);
const dynamicViews = [...viewText.matchAll(/\n\s*\['([^']+)',\{/g)].map(m=>m[1]);
const missingViews = [...new Set(navRoutes.filter(r=>!new RegExp(`VIEWS\\.${r}\\s*=`).test(viewText) && !dynamicViews.includes(r)))].sort();
if (unhandled.length || missingViews.length) {
  console.error(JSON.stringify({unhandled, missingViews}, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({actions:[...new Set(used)].length, routes:navRoutes.length, status:'ok'}, null, 2));
