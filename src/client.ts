// dsh-ocean-effort-skin — client half.
// Keeps the official DSH theme. Adds two things only:
//   1. rotating, crossfading ocean backgrounds behind the app, under translucent official surfaces;
//   2. the Claude-desktop model + effort picker (pixel-field slider), ported from
//      zkforge/dsh-claude-desktop-theme (MIT, see src/model-controls/LICENSE-claude-desktop-theme).
import { useSyncExternalStore } from 'react';
import type { Context } from '@deepseek-ai/cordis';
import { ModelControls } from './model-controls/ModelControls.tsx';
import { effortSelection } from './model-controls/selection.ts';
import controlsCss from './model-controls/controls.css';
import effortCss from './model-controls/effort.css';
import tokensCss from './tokens.css';
import skinCss from './skin.css';
import bg1 from '../assets/bg-1.jpg';
import bg2 from '../assets/bg-2.jpg';
import bg3 from '../assets/bg-3.jpg';
import bg4 from '../assets/bg-4.jpg';

const BACKGROUNDS = [bg1, bg2, bg3, bg4];
const ROTATE_MS = 60_000;

// Two stacked layers; the hidden one loads the next picture, then fades in.
function mountBackgrounds(): () => void {
  const layers = [0, 1].map(() => {
    const el = document.createElement('div');
    el.className = 'dsh-ocean-bg-layer';
    el.setAttribute('aria-hidden', 'true');
    document.body.prepend(el);
    return el;
  });
  let index = Math.floor(Math.random() * BACKGROUNDS.length);
  let front = 0;
  layers[0].style.backgroundImage = `url("${BACKGROUNDS[index]}")`;
  layers[0].setAttribute('data-on', '');
  const timer = window.setInterval(() => {
    if (document.hidden) return;
    index = (index + 1) % BACKGROUNDS.length;
    const back = 1 - front;
    layers[back].style.backgroundImage = `url("${BACKGROUNDS[index]}")`;
    layers[back].setAttribute('data-on', '');
    layers[front].removeAttribute('data-on');
    front = back;
  }, ROTATE_MS);
  return () => { window.clearInterval(timer); for (const el of layers) el.remove(); };
}

const ID = 'dsh-ocean-effort-skin';
const MARK = 'data-dsh-ocean-skin';

function insertStyle(css: string): () => void {
  const tag = document.createElement('style');
  tag.setAttribute('data-plugin-css', ID);
  tag.textContent = css;
  document.head.appendChild(tag);
  return () => tag.remove();
}

// Translucent official surfaces so the background shows through. Only stable
// semantic tokens are touched; no hashed class names.
const TOKENS = {
  '--dsw-alias-bg-base': { light: 'rgba(250, 249, 246, 0.90)', dark: 'rgba(28, 27, 26, 0.90)' },
  '--dsw-specific-sidebar-fill': { light: 'rgba(246, 244, 240, 0.86)', dark: 'rgba(22, 21, 20, 0.86)' },
};

interface ClientSessionList { subagentAddress(sessionId: string): unknown }

export const inject = ['theme', 'slots'];

export function apply(ctx: Context): void {
  const c = ctx as any;
  c.effect(() => {
    const off: Array<() => void> = [];
    document.documentElement.setAttribute(MARK, '');
    off.push(() => document.documentElement.removeAttribute(MARK));
    off.push(insertStyle(tokensCss));
    off.push(insertStyle(controlsCss));
    off.push(insertStyle(effortCss));
    off.push(insertStyle(skinCss));
    off.push(mountBackgrounds());
    if (c.theme !== undefined) off.push(c.theme.overrideTokens(ID, TOKENS));
    return () => { for (const fn of off.reverse()) fn(); };
  });

  // Replace the model/effort selector, exactly like the Claude desktop theme does.
  c.inject(['modelDirectories', 'sessions', 'slots'], (scope: any) => {
    const sessions = scope.sessions as ClientSessionList;
    return scope.slots.inject('conversation.input.model', () => scope.slots.register({
      name: 'conversation.input.model', priority: -10, locale: 'model',
      inject: (sessionId: any) => {
        const directory = scope.modelDirectories.directoryFor(sessionId);
        const available = sessions.subagentAddress(sessionId) === undefined;
        return {
          available,
          showModelIcons: true,
          splitControls: true,
          useDirectory: () => useSyncExternalStore(directory.store.subscribe, directory.store.getSnapshot),
          load: () => { if (available) void directory.load().catch(() => {}); },
          select: (selection: any) => available ? directory.select(selection) : Promise.resolve(undefined),
          selectEffort: (route: any, effort: string | undefined) => {
            if (!available) return;
            const selection = effortSelection(directory.store.getSnapshot(), route, effort);
            if (selection) void directory.select(selection).catch(() => {});
          },
        };
      },
    }, ModelControls));
  });
}
