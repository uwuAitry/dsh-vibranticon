// Structural + render self-check for the vibranticon client plugin: the plugin
// must register a Settings section only (no gallery) and its switches must work.
// Run: node _selftest.mjs
import assert from 'node:assert';
import fs from 'node:fs';

let def = null;
const store = new Map();
globalThis.window = {
  __ModuleLoader__: { load: d => { def = d; } },
  localStorage: { getItem: k => (store.has(k) ? store.get(k) : null), setItem: (k, v) => store.set(k, String(v)) },
};
await import('./client.js');
assert.ok(def && typeof def.factory === 'function', 'module loader definition captured');

const React = {
  createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
  useState: init => [typeof init === 'function' ? init() : init, () => {}],
  useEffect: fn => fn(),
};
const plugin = def.factory(name => {
  if (name === 'react') return React;
  throw new Error('unexpected require ' + name);
});
assert.deepStrictEqual(plugin.inject, ['slots', 'locale']);

const regs = [];
const ctx = {
  effect: () => () => {},
  locale: { register: () => {}, bind: () => k => k },
  slots: {
    inject: (_key, fn) => fn(),
    register: (opts, comp) => { regs.push({ name: opts.name, id: opts.id, comp }); return () => {}; },
  },
};
plugin.apply(ctx);

assert.strictEqual(regs.length, 1, 'exactly one slot registration');
assert.strictEqual(regs[0].name, 'settings.section', 'registers into the settings page');
assert.strictEqual(regs[0].id, 'vibranticon');
assert.ok(!regs.some(r => r.name === 'conversation.view'), 'no gallery tab registered');

const render = node => {
  if (node == null || typeof node !== 'object') return node;
  if (Array.isArray(node)) return node.map(render);
  if (typeof node.type === 'function') return render(node.type({ ...node.props, children: node.children }));
  return { ...node, children: (node.children || []).map(render) };
};
const tree = render(regs[0].comp({ t: key => key }));
const switches = [];
const walk = node => {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) { node.forEach(walk); return; }
  if (node.props && node.props.role === 'switch') switches.push(node);
  (node.children || []).forEach(walk);
};
walk(tree);
assert.strictEqual(switches.length, 2, 'two preference switches render');
switches[0].props.onClick();
assert.match(store.get('vibranticon/prefs'), /"hover":false/, 'switch persists the preference');

const src = fs.readFileSync(new URL('./client.js', import.meta.url), 'utf8');
assert.ok(!src.includes('IconGalleryView') && !src.includes('MOTION_LABEL'), 'gallery code removed');
assert.ok(src.includes('vic-switch') && src.includes("name: 'settings.section'"), 'settings UI present');
assert.strictEqual((src.match(/"key":"/g) || []).length, 32, '32 icon records kept for the motion map');
console.log('vibranticon selftest OK: settings.section only, 2 switches, no gallery');
