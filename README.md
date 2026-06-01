# 抓大鵝 Catch Goose Game

一个使用 Vite + React + TypeScript + CSS 制作的原创网页休闲小游戏。项目灵感来自三消收纳玩法：玩家点击没有被上层遮挡的物品，把物品放入下方 7 格收纳栏，凑满 3 个相同物品后自动消除，清空桌面与收纳栏即可成功抓到大鹅。

本项目为原创 UI、原创代码与占位视觉实现，不是任何现有游戏的官方版本，也不复刻第三方素材、截图、商标、音效或关卡。

## 游戏玩法

- 点击中间叠放区里没有被遮挡的物品。
- 被遮挡的物品会变暗，点击后不会进入收纳栏。
- 物品进入下方收纳栏后，3 个相同物品会自动消除。
- 每次正确点击加 10 分，每组三消额外加 60 分。
- 使用「提示」「打亂」「移除」道具可以辅助通关，打亂扣 30 分，移除扣 50 分。
- 倒计时结束或下方 7 格收纳栏装满时失败。
- 清空桌面和收纳栏后胜利，并获得胜利与剩余时间奖励。

## 本地运行

```bash
npm install
npm run dev
```

默认开发地址：

```text
http://localhost:5173
```

## Build

```bash
npm run build
```

生产预览：

```bash
npm run preview
```

## GitHub 上传说明

```bash
git init
git add .
git commit -m "Complete catch goose game project"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

如果远程仓库还没有创建，请先在 GitHub 创建空仓库，建议仓库名为 `catch-goose-game`，不要勾选自动生成 README，避免和本地文件冲突。

## Vercel 部署说明

在 Vercel 中选择 Add New Project，导入 GitHub 仓库后使用以下设置：

- Framework Preset：Vite
- Install Command：`npm install`
- Build Command：`npm run build`
- Output Directory：`dist`

部署后请验证首页能打开、游戏能开始、手机浏览器可点击、刷新后没有白屏，控制台没有明显报错。

## 视觉资源

当前版本使用 emoji 与 CSS 图形作为可运行占位素材，确保项目不依赖外部图片也能正常游玩。正式素材可根据 [docs/image2-prompts.md](docs/image2-prompts.md) 的原创 Image2 提示词生成后替换。
