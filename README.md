# dsh-ocean-effort-skin

A light skin for DeepSeek Harness (Desktop and Web). It keeps the **official DSH theme** and adds two things:

1. **Rotating ocean backgrounds**: four watercolor ocean pictures behind the app. Each one places the whale-eared girl in the left quarter, under the sidebar, with small decorations in the other corners. A random picture shows at start, then the next one crossfades in every 60 seconds (2.4 s fade; no animation with reduced motion). The official surfaces become translucent (about 80–86% opaque) so the picture shows through. Light and dark modes are supported.
2. **Claude desktop model / effort picker**: the model and effort picker from [zkforge/dsh-claude-desktop-theme](https://github.com/zkforge/dsh-claude-desktop-theme), including the animated pixel-field effort slider at Max.

中文：保留官方主题，加入四张定时淡入淡出轮换的海洋背景（鲸耳少女位于侧边栏后方，其余角落有小装饰），以及 Claude Desktop 主题的模型 / Effort 选择器（Max 档的像素流动特效）。

## Install

```
dsh plugin --profile desktop add github:SiyuQian/dsh-ocean-effort-skin
```

Then refresh the page. Do not enable this together with `dsh-claude-desktop-theme`: both replace the `conversation.input.model` slot.

## Build

```
npm install
npm run build   # writes lib/index.js and lib/client.js
```

`lib/` is committed so the package installs directly from GitHub.

## Credits

- Model / effort picker (`src/model-controls/`, `src/tokens.css`): adapted from [zkforge/dsh-claude-desktop-theme](https://github.com/zkforge/dsh-claude-desktop-theme), MIT. That code in turn adapts [zanwei/claude-model-selector](https://github.com/zanwei/claude-model-selector), MIT. See `src/model-controls/LICENSE-claude-desktop-theme`.
- Plugin icon (`assets/icon.svg`, `assets/avatar.png`) and background images (`assets/bg-1.jpg` … `bg-4.jpg`): generated with gpt-image, using the character from [chouxiaohuai/dsh-uiskin-theme](https://github.com/chouxiaohuai/dsh-uiskin-theme) as reference. The MIT license of this repository **does not cover these images**; character rights belong to the original author.

## License

MIT for the code in this repository (see `LICENSE`). The background image is excluded, as described above.
