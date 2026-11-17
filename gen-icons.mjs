// gen-icons.mjs — inject the ICONS data from ../iconpack/data.js into client.js.
// Usage: node gen-icons.mjs   (run from the plugin directory)
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import url from 'node:url';

const here = path.dirname(url.fileURLToPath(import.meta.url));
const dataSrc = fs.readFileSync(path.join(here, 'iconpack', 'data.js'), 'utf8');
const ctx = { window: {}, console };
vm.createContext(ctx);
vm.runInContext(dataSrc.replace(/^const /gm, 'var ').replace(/^let /gm, 'var '), ctx);
if (!Array.isArray(ctx.ICONS) || ctx.ICONS.length !== 32) {
  throw new Error('expected 32 icons from iconpack/data.js, got ' + (ctx.ICONS && ctx.ICONS.length));
}
const json = JSON.stringify(ctx.ICONS);
let packJson = null;
try { packJson = JSON.parse(fs.readFileSync(path.join(here, 'icons-animated.json'), 'utf8')); } catch {}
const packSrc = 'null'; // hover 方案不再注入大段替换数据
const tpl = fs.readFileSync(path.join(here, 'client.template.js'), 'utf8');
if (!tpl.includes('/*__ICONS__*/[]')) throw new Error('ICONS placeholder missing in client.template.js');
if (!tpl.includes('/*__REPLACEMENTS__*/null')) throw new Error('REPLACEMENTS placeholder missing in client.template.js');
const out = tpl.replace('/*__ICONS__*/[]', json).replace('/*__REPLACEMENTS__*/null', packSrc);
fs.writeFileSync(path.join(here, 'client.js'), out, 'utf8');
console.log(`wrote client.js with ${ctx.ICONS.length} icons (~${Math.ceil(json.length / 1024)} KiB) + ${packJson ? Object.keys(packJson).length : 0} animated replacements (~${Math.ceil(packSrc.length / 1024)} KiB)`);
