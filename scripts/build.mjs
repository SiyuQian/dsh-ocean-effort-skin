import { build } from 'esbuild';
import { copyFile, mkdir } from 'node:fs/promises';
const BASELINE = ['react', 'react/jsx-runtime', 'react/jsx-dev-runtime', '@deepseek-ai/cordis',
  '@deepseek-ai/dsh-client-store', '@deepseek-ai/dsh-client-ui-slots', '@deepseek-ai/dsh-client-ui-primitives'];
await mkdir('lib', { recursive: true });
await copyFile('src/host.js', 'lib/index.js');
await build({
  entryPoints: ['src/client.ts'], outfile: 'lib/client.js', bundle: true,
  format: 'cjs', platform: 'browser', target: 'es2022', jsx: 'automatic',
  external: BASELINE, loader: { '.css': 'text', '.jpg': 'dataurl' },
  banner: { js: 'window.__ModuleLoader__.load({\n  id: "dsh-ocean-effort-skin",\n  factory(require) {\n    const module = { exports: {} };\n    const exports = module.exports;' },
  footer: { js: '\n    return module.exports;\n  }\n});' },
});
console.log('built lib/index.js + lib/client.js');
