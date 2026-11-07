# dsh-ocean-effort-skin

A light skin for DeepSeek Harness (Desktop and Web). It keeps the **official DSH theme** and adds two things:

1. **Ocean background**: an ocean background image behind the app. The official surfaces become translucent (about 80–86% opaque) so the image shows through. Light and dark modes are supported.
2. **Claude desktop model / effort picker**: the model and effort picker from [zkforge/dsh-claude-desktop-theme](https://github.com/zkforge/dsh-claude-desktop-theme), including the animated pixel-field effort slider at Max.

中文：保留官方主题，只加入 uiskin 风格的海洋背景图，以及 Claude Desktop 主题的模型 / Effort 选择器（Max 档的像素流动特效）。

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
- Background image (`assets/bg.jpg`): from [chouxiaohuai/dsh-uiskin-theme](https://github.com/chouxiaohuai/dsh-uiskin-theme). The upstream repository publishes no license for it, so the MIT license of this repository **does not cover this image**. All rights belong to its author. If you are the author and want it removed, open an issue.

## License

MIT for the code in this repository (see `LICENSE`). The background image is excluded, as described above.
