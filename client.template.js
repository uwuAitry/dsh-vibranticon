// client.js — vibranticon: the living-icon motion layer and its Settings page.
// No gallery: product icons animate on hover across the app; this plugin only
// registers one Settings section (a switch per preference) plus the motion layer.
window.__ModuleLoader__.load({
  id: 'dsh-vibranticon',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const { useEffect, useState } = React;

    // ---- icon data (generated from iconpack/data.js by gen-icons.mjs) ----
    const ICONS = /*__ICONS__*/[];
    const REPLACEMENTS = /*__REPLACEMENTS__*/null;

    const NS = 'vibranticon';
    const zh = {
      'settings.title': '灵动图标',
      'settings.desc': '界面图标在鼠标悬停时播放一次贴合语义的短动效；静止时零动画。',
      'settings.hover': '界面图标动效',
      'settings.hover.desc': '悬停产品或导航图标时播放一次动效，移开即回到静止。',
      'settings.thinking': '思考图标持续旋转',
      'settings.thinking.desc': '模型正在推理时，「思考」图标持续缓慢自转，推理结束即停。',
    };
    const en = {
      'settings.title': 'Living icons',
      'settings.desc': 'UI icons play one short semantic motion on hover; idle icons never animate.',
      'settings.hover': 'Icon motion on hover',
      'settings.hover.desc': 'Play one motion when hovering a product or navigation icon; it settles when the pointer leaves.',
      'settings.thinking': 'Spin the thinking icon',
      'settings.thinking.desc': 'Rotate the thinking icon slowly while the model is reasoning, and stop when it finishes.',
    };

    // ---- preferences (per browser, persisted in localStorage) ----
    const PREF_KEY = 'vibranticon/prefs';
    const PREFS = { hover: true, thinking: true };
    try {
      const saved = JSON.parse((window.localStorage && window.localStorage.getItem(PREF_KEY)) || 'null');
      if (saved && typeof saved === 'object') {
        if (typeof saved.hover === 'boolean') PREFS.hover = saved.hover;
        if (typeof saved.thinking === 'boolean') PREFS.thinking = saved.thinking;
      }
    } catch (e) { /* storage unavailable: keep defaults */ }
    const prefSubs = new Set();
    let liveStyle = null;
    let resetAllMotions = () => {};
    function syncPrefs() {
      if (liveStyle) liveStyle.textContent = PREFS.thinking ? vicLiveCss() : '';
      if (!PREFS.hover) resetAllMotions();
    }
    function setPref(key, value) {
      if (PREFS[key] === value) return;
      PREFS[key] = value;
      try { window.localStorage && window.localStorage.setItem(PREF_KEY, JSON.stringify(PREFS)); } catch (e) { /* ignore */ }
      syncPrefs();
      for (const sub of prefSubs) sub();
    }
    function usePrefs() {
      const [snap, setSnap] = useState(() => ({ ...PREFS }));
      useEffect(() => {
        const read = () => setSnap({ ...PREFS });
        prefSubs.add(read);
        return () => { prefSubs.delete(read); };
      }, []);
      return snap;
    }

    // 仅鼠标悬停时播放一次的图标动效层（纯 CSS：空闲零动画、几乎零开销；大量图标也不影响性能）。
    // 作用对象是宿主每个图标 svg[data-icon="dsw-icon-<glyph>-<weight>"]。
    // 官方 sprite id 形如 dsw-icon-<glyph>-<weight>，glyph 保留 -outline / -fill 后缀：
    // RefreshOutline → refresh-outline、StopFill → stop-fill、Sparkle → sparkle。
    const VIC_GLYPH = rec => {
      const m = /(Outline|Fill)$/.exec(rec.file);
      const base = rec.file.replace(/(Outline|Fill)$/, '').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      return m ? base + '-' + m[1].toLowerCase() : base;
    };
    const VIC_ANIM = { spin: 'vic-spin', press: 'vic-press', pulse: 'vic-pop', breathe: 'vic-breathe', twinkle: 'vic-twinkle', bob: 'vic-up', nod: 'vic-down', drift: 'vic-right', scan: 'vic-down', sway: 'vic-sway', lid: 'vic-lid', flap: 'vic-up', foldertip: 'vic-up', peel: 'vic-up', orbit: 'vic-orbit', drawloop: 'vic-pop', atom: 'vic-orbit', sliders: 'vic-left', brackets: 'vic-brackets', flip: 'vic-pop' };
    const VIC_KEY_ANIM = { plus: 'vic-spin90', send: 'vic-up', mic: 'vic-up', settings: 'vic-left', globe: 'vic-breathe', search: 'vic-orbit', check: 'vic-pop', plan: 'vic-pop' };
    const VIC_ANIM_BY_GLYPH = (() => { const m = {}; for (const rec of ICONS) { const g = VIC_GLYPH(rec); m[g] = VIC_KEY_ANIM[rec.key] || VIC_ANIM[rec.motion] || 'vic-pop'; } return m; })();
    // ---- 图标动效状态机（Web Animations API）----
    // 每个动作都是「初始 → 末态」的单向关键帧：正序 = play()，反向 = playbackRate=-1，
    // 因此可中途打断、可反向且无跳变；未选中离开→反向回初始，选中→停在末态保持。
    const VIC_MOTION_DEFS = {
      'vic-spin': { kf: [{ transform: 'rotate(0deg)' }, { transform: 'rotate(90deg)' }], dur: 480 },
      'vic-spin90': { kf: [{ transform: 'rotate(0deg)' }, { transform: 'rotate(90deg)' }], dur: 480 },
      'vic-press': { kf: [{ transform: 'scale(1)' }, { transform: 'scale(0.88)' }], dur: 260 },
      'vic-pop': { kf: [{ transform: 'scale(1)' }, { transform: 'scale(1.12)' }], dur: 320 },
      'vic-breathe': { kf: [{ transform: 'scale(1)' }, { transform: 'scale(0.9)' }], dur: 420 },
      'vic-up': { kf: [{ transform: 'translateY(0)' }, { transform: 'translateY(-2px)' }], dur: 260 },
      'vic-down': { kf: [{ transform: 'translateY(0)' }, { transform: 'translateY(2px)' }], dur: 260 },
      'vic-left': { kf: [{ transform: 'translateX(0)' }, { transform: 'translateX(-2px)' }], dur: 260 },
      'vic-right': { kf: [{ transform: 'translateX(0)' }, { transform: 'translateX(2px)' }], dur: 260 },
      'vic-sway': { kf: [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-7deg)' }], dur: 360 },
      'vic-lid': { kf: [{ transform: 'translateY(0)' }, { transform: 'translateY(-2.4px)' }], dur: 300 },
      'vic-twinkle': { kf: [{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(0.82)', opacity: 0.45 }], dur: 360 },
      'vic-orbit': { kf: [{ transform: 'translate(0,0)' }, { transform: 'translate(1.4px,0)' }], dur: 360 },
      'vic-brackets': { kf: [{ transform: 'translateY(0)' }, { transform: 'translateY(1.8px)' }], dur: 360 },
    };
    // 仅“正在思考”的图标持续旋转（原子轨道转≈电子绕行）：只看流式中的思考行 / 过程头 activity=thinking；
    // 历史/已完成的思考行 data-state=ok，不会动——避免列表里一堆图标一直转。
    const VIC_LIVE = '[data-state="running"] svg[data-icon^="dsw-icon-think-outline"],'
      + '[data-process-activity="thinking"] svg[data-icon^="dsw-icon-think-outline"]{'
      + 'transform-box:fill-box;transform-origin:center;animation:vic-think 2.4s linear infinite}';
    function vicLiveCss() {
      return '@media (prefers-reduced-motion: no-preference){'
        + '@keyframes vic-think{to{transform:rotate(360deg)}}'
        + VIC_LIVE + '}';
    }
    function installLiveCss(ctx) {
      ctx.effect(() => {
        const el = document.createElement('style');
        el.setAttribute('data-vibranticon', '');
        liveStyle = el;
        el.textContent = PREFS.thinking ? vicLiveCss() : '';
        document.head.appendChild(el);
        return () => { liveStyle = null; el.remove(); };
      }, 'vibranticon: live icon css');
    }
    function installIconMotion(ctx) {
      ctx.effect(() => {
        const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const states = new WeakMap();
        const tracked = new Set();
        const hostOf = svg => svg.closest('button, a, [role="tab"], [role="menuitem"], [aria-selected], [aria-current], [data-active]');
        const isSelected = host => !!host && (
          host.getAttribute('aria-selected') === 'true' ||
          host.getAttribute('aria-current') === 'true' || host.hasAttribute('aria-current') ||
          host.getAttribute('data-active') === 'true' ||
          /(^|[\s_-])(active|selected|current)([\s_-]|$)/.test(host.className || '')
        );
        const svgOf = ev => {
          const t = ev.target;
          if (!t || !t.closest) return null;
          const direct = t.closest('svg[data-icon]');
          if (direct) return direct;
          // 图标常设 pointer-events:none，事件目标可能是外层按钮：回退到宿主内的第一个图标
          const host = t.closest('button, a, [role="tab"], [role="menuitem"], [aria-selected], [aria-current], [data-active]');
          return host ? host.querySelector('svg[data-icon]') : null;
        };
        const defOf = svg => {
          const m = /^dsw-icon-(.+)-(?:regular|medium)$/.exec(svg.getAttribute('data-icon') || '');
          const name = m && VIC_ANIM_BY_GLYPH[m[1]];
          return name ? VIC_MOTION_DEFS[name] : null;
        };
        const ensure = svg => {
          let st = states.get(svg);
          if (st) return st;
          const def = defOf(svg);
          if (!def) return null;
          svg.style.transformBox = 'fill-box';
          svg.style.transformOrigin = 'center';
          const anim = svg.animate(def.kf, { duration: def.dur, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'both' });
          anim.pause(); anim.currentTime = 0;
          st = { anim, def, selected: false, reversing: false, timer: null };
          anim.onfinish = () => { if (st.reversing) { st.reversing = false; anim.cancel(); } };
          states.set(svg, st);
          tracked.add(svg);
          return st;
        };
        const forward = svg => {
          const st = ensure(svg); if (!st) return;
          st.reversing = false;
          clearTimeout(st.timer);
          const a = st.anim;
          if (a.playState === 'idle' || (a.playbackRate > 0 && a.playState === 'finished')) a.currentTime = 0;
          a.playbackRate = 1;
          a.play();
        };
        const reverse = svg => {
          const st = states.get(svg); if (!st) return;
          st.reversing = true;
          clearTimeout(st.timer);
          const a = st.anim;
          if (a.playbackRate < 0 && a.playState === 'running') return; // 已在反向
          a.playbackRate = -1;
          a.play();
        };
        const reset = svg => { const st = states.get(svg); if (!st) return; st.reversing = false; clearTimeout(st.timer); st.anim.cancel(); };
        resetAllMotions = () => { for (const svg of tracked) { const st = states.get(svg); if (st) { clearTimeout(st.timer); st.anim.cancel(); } } };
        const syncSelection = () => {
          for (const svg of tracked) {
            if (!svg.isConnected) { tracked.delete(svg); states.delete(svg); continue; }
            const st = states.get(svg); if (!st) continue;
            const sel = isSelected(hostOf(svg));
            if (sel && !st.selected) { st.selected = true; forward(svg); }
            else if (!sel && st.selected) { st.selected = false; reverse(svg); }
          }
        };
        const onOver = ev => {
          const svg = svgOf(ev); if (!svg) return;
          if (!PREFS.hover || reduce()) { reset(svg); return; }
          const st = ensure(svg); if (!st) return;
          st.selected = isSelected(hostOf(svg));
          forward(svg);
        };
        const onOut = ev => {
          const svg = svgOf(ev); if (!svg) return;
          if (ev.relatedTarget && svg.contains(ev.relatedTarget)) return;
          const st = states.get(svg); if (!st) return;
          if (!PREFS.hover || reduce()) { reset(svg); return; }
          if (isSelected(hostOf(svg))) { st.selected = true; return; }
          st.selected = false;
          reverse(svg);
        };
        const onClick = ev => {
          const svg = svgOf(ev); if (!svg) return;
          if (!PREFS.hover || reduce()) return;
          const st = ensure(svg); if (!st) return;
          const sel = isSelected(hostOf(svg));
          st.selected = sel;
          forward(svg);
          if (!sel) st.timer = setTimeout(() => { const cur = states.get(svg); if (cur && !cur.selected) reverse(svg); }, st.def.dur + 140);
          setTimeout(syncSelection, 0);
          setTimeout(syncSelection, 180);
        };
        const mo = new MutationObserver(syncSelection);
        mo.observe(document.documentElement, { subtree: true, attributes: true, attributeFilter: ['aria-selected', 'aria-current', 'data-active', 'data-state'] });
        document.addEventListener('pointerover', onOver, true);
        document.addEventListener('pointerout', onOut, true);
        document.addEventListener('click', onClick, true);
        return () => {
          document.removeEventListener('pointerover', onOver, true);
          document.removeEventListener('pointerout', onOut, true);
          document.removeEventListener('click', onClick, true);
          mo.disconnect();
          for (const svg of tracked) { const st = states.get(svg); if (st) { clearTimeout(st.timer); st.anim.cancel(); } }
          tracked.clear();
          resetAllMotions = () => {};
        };
      }, 'vibranticon: icon motion');
    }

    const SETTINGS_CSS = [
      '.vic-prefs { display: flex; flex-direction: column; padding: 4px 0; }',
      '.vic-prefs-title { font-size: 14px; font-weight: 600; color: var(--dsw-alias-label-primary); }',
      '.vic-prefs-desc { margin: 3px 0 10px; font-size: 12px; line-height: 1.5; color: var(--dsw-alias-label-secondary); }',
      '.vic-pref { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 12px 0; border-bottom: 1px solid var(--dsw-alias-border-l2); }',
      '.vic-pref:last-child { border-bottom: none; padding-bottom: 0; }',
      '.vic-pref-label { font-size: 13px; color: var(--dsw-alias-label-primary); }',
      '.vic-pref-note { margin-top: 3px; font-size: 11px; line-height: 1.5; color: var(--dsw-alias-label-tertiary); }',
      '.vic-switch { flex: none; position: relative; width: 34px; height: 20px; padding: 0; border-radius: 999px; cursor: pointer;',
      '  border: 1px solid var(--dsw-alias-border-l2); background: var(--dsw-alias-bg-layer-1);',
      '  transition: background 150ms cubic-bezier(.4,0,.2,1), border-color 150ms cubic-bezier(.4,0,.2,1); }',
      '.vic-switch::after { content: ""; position: absolute; top: 50%; left: 2px; width: 14px; height: 14px; margin-top: -7px; border-radius: 50%;',
      '  background: var(--dsw-alias-label-secondary); transition: transform 150ms cubic-bezier(.4,0,.2,1), background 150ms; }',
      '.vic-switch[aria-checked="true"] { background: var(--dsw-alias-brand-primary); border-color: var(--dsw-alias-brand-primary); }',
      '.vic-switch[aria-checked="true"]::after { transform: translateX(14px); background: #fff; }',
      '.vic-switch:focus-visible { outline: 1px solid var(--dsw-alias-brand-primary); outline-offset: 2px; }',
      '@media (prefers-reduced-motion: reduce) { .vic-switch, .vic-switch::after { transition: none; } }',
    ].join('\n');

    function PrefRow({ label, note, checked, onChange }) {
      return h('div', { className: 'vic-pref' },
        h('div', null,
          h('div', { className: 'vic-pref-label' }, label),
          note ? h('div', { className: 'vic-pref-note' }, note) : null),
        h('button', {
          type: 'button',
          role: 'switch',
          className: 'vic-switch',
          'aria-checked': checked ? 'true' : 'false',
          'aria-label': label,
          onClick: () => onChange(!checked),
        }));
    }

    function IconSettingsSection(props) {
      const t = props.t || (k => zh[k]);
      const prefs = usePrefs();
      return h('div', { className: 'vic-prefs' },
        h('style', null, SETTINGS_CSS),
        h('div', { className: 'vic-prefs-title' }, t('settings.title')),
        h('div', { className: 'vic-prefs-desc' }, t('settings.desc')),
        h(PrefRow, { label: t('settings.hover'), note: t('settings.hover.desc'), checked: prefs.hover, onChange: v => setPref('hover', v) }),
        h(PrefRow, { label: t('settings.thinking'), note: t('settings.thinking.desc'), checked: prefs.thinking, onChange: v => setPref('thinking', v) }));
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'vibranticon: dictionaries');
        const t = ctx.locale.bind(NS);
        installLiveCss(ctx);
        installIconMotion(ctx);
        syncPrefs();
        // Registers only a Settings section; there is no gallery tab.
        ctx.slots.inject('settings.section', () => ctx.slots.register({
          name: 'settings.section',
          id: 'vibranticon',
          order: 50,
          locale: NS,
          label: () => t('settings.title'),
        }, IconSettingsSection));
      },
    };
  },
});
