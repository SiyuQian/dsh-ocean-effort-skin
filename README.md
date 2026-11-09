# dsh-ocean-effort-skin

A light skin for DeepSeek Harness (Desktop and Web). It keeps the **official DSH theme** and adds two things:

1. **Rotating ocean backgrounds**: four watercolor ocean pictures behind the app. Each one places the whale-eared girl in the left quarter, under the sidebar, with small decorations in the other corners. A random picture shows at start, then the next one crossfades in every 60 seconds (2.4 s fade; no animation with reduced motion). The official surfaces become translucent (about 80–86% opaque) so the picture shows through. Light and dark modes are supported.
2. **Claude desktop model / effort picker**: the model and effort picker from [zkforge/dsh-claude-desktop-theme](https://github.com/zkforge/dsh-claude-desktop-theme), including the animated pixel-field effort slider at Max.

中文：保留官方主题，加入四张定时淡入淡出轮换的海洋背景（鲸耳少女位于侧边栏后方，其余角落有小装饰），以及 Claude Desktop 主题的模型 / Effort 选择器（Max 档的像素流动特效）。

## Install

Once the first scoped npm release has been published:

```
dsh plugin --profile desktop add @siyuqian/dsh-ocean-effort-skin
```

Installing the registry package under its own name enables DSH's native **Plugins → Ocean skin → Version / Recheck** section. Git and local links, including the development checkout, do not support native version checks. Do not use an `npm:` alias.

For migration, first record the old source, version, enabled state, and row config. Publish and verify the scoped package before removing the old bundle through Plugin Manager, then install the scoped package with the original enabled state. Keep the row id `dsh-ocean-effort-skin`; remove or update only stale `name: dsh-ocean-effort-skin` assertions on that row. Storage keys and settings stay unchanged. If installation fails, reinstall the recorded source. Never enable old and scoped names together.

中文：首次发布后安装 `@siyuqian/dsh-ocean-effort-skin` 的 npm 版本，才会显示原生「版本／重新检查」区域；Git、本地链接和 `npm:` 别名不支持。迁移前记录旧来源、版本、启用状态与配置，先验证发布包再通过插件管理器更换来源，保留行 id、设置与存储键；失败则恢复原来源，不要同时启用新旧包。

Then refresh the page. Do not enable this together with `dsh-claude-desktop-theme`: both replace the `conversation.input.model` slot.

## Build

```
npm ci --ignore-scripts
npm test        # builds lib/index.js and lib/client.js, verifies scoped Client registration
```

`lib/` is committed so the package installs directly from GitHub.

## Publish

Use an npm account with write access to `@siyuqian`; do not store credentials in this repository. Confirm permission to redistribute the character-reference artwork described below before publishing publicly.

```sh
npm ci --ignore-scripts
npm test
npm pack --dry-run
npm whoami --registry=https://registry.npmjs.org/
npm publish --access public
```

Verify `npm view @siyuqian/dsh-ocean-effort-skin version repository` before changing any profile. Increment both manifest and lockfile versions for subsequent releases. The package includes the adapted model picker's MIT notice alongside the root license.

中文：使用有权写入 `@siyuqian` 的 npm 账号，公开发布前确认下述参考角色图片的再分发授权。先测试、检查打包内容，发布后确认版本与仓库，再迁移安装；不要把凭据写入仓库。

## Credits

- Model / effort picker (`src/model-controls/`, `src/tokens.css`): adapted from [zkforge/dsh-claude-desktop-theme](https://github.com/zkforge/dsh-claude-desktop-theme), MIT. That code in turn adapts [zanwei/claude-model-selector](https://github.com/zanwei/claude-model-selector), MIT. See `src/model-controls/LICENSE-claude-desktop-theme`.
- Plugin icon (`assets/icon.svg`, `assets/avatar.png`) and background images (`assets/bg-1.jpg` … `bg-4.jpg`): generated with gpt-image, using the character from [chouxiaohuai/dsh-uiskin-theme](https://github.com/chouxiaohuai/dsh-uiskin-theme) as reference. The MIT license of this repository **does not cover these images**; character rights belong to the original author.

## License

MIT for the code in this repository (see `LICENSE`). The background image is excluded, as described above.
