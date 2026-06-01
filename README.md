# 抓大鵝 Catch Goose Game

一个使用 Vite + React + TypeScript + CSS 制作的原创网页休闲小游戏。项目灵感来自三消收纳玩法：玩家点击没有被上层遮挡的物品，把物品放入下方 7 格收纳栏，凑满 3 个相同物品后自动消除，连续通关 3 个关卡即可成功抓到大鹅。

本项目为原创 UI、原创代码与占位视觉实现，不是任何现有游戏的官方版本，也不复刻第三方素材、截图、商标、音效或关卡。

## 在线地址

- Vercel Production：https://catch-goose-game.vercel.app
- GitHub Repository：https://github.com/yjy824-create/catch-goose-game

## 游戏玩法

- 点击中间叠放区里没有被遮挡的物品。
- 被遮挡的物品会变暗，点击后不会进入收纳栏。
- 物品进入下方收纳栏后，3 个相同物品会自动消除。
- 三消会获得分数，连续三消会提升 combo。
- 使用「提示」「打亂」「移除」道具可以辅助通关，打亂会重置 combo，移除会扣少量分数。
- 倒计时结束或下方 7 格收纳栏装满时失败。
- 清空桌面和收纳栏后胜利，并获得胜利与剩余时间奖励。

## 多关卡

当前版本包含 3 个关卡：

- 第 1 关：农场初级挑战，物品较少、遮挡较轻、时间较充足。
- 第 2 关：小院进阶挑战，物品数量增加、遮挡层级增加、时间略缩短。
- 第 3 关：大鹅终极挑战，物品最多、遮挡更明显、时间更短。

通关后可以进入下一关；第 3 关通关后显示最终胜利。失败后可以重新挑战当前关，也可以回到首页从第 1 关重新开始。

## 分数机制

- 三消成功：combo 1 加 10 分。
- 连击奖励：连续三消会提高 combo，combo 2 加 15 分，combo 3 加 20 分，依此递增。
- 点击没有形成三消、使用打乱或移除会重置 combo。
- 每关通关会按剩余秒数增加时间奖励，剩余 1 秒加 1 分。
- 总分跨关卡累计，失败和最终通关时都会显示本次总分。

## 本地最高分

游戏使用 `localStorage` 保存本机历史最高分，不需要后端、登录或数据库。首页、游戏中与结果弹窗都会显示最高分；失败或最终通关时如果刷新纪录，会显示「新纪录」。

## 第二阶段优化

- 升级为更完整的农场小院视觉：鹅黄色、奶白色、浅橙色、草绿色。
- 增强按钮、游戏区、收纳篮、胜利/失败弹窗的立体感和动画反馈。
- 使用 Web Audio API 生成点击、三消、胜利、失败和道具音效，不依赖外部音频文件。
- 优化手机端布局，常见 iPhone / Android 宽度下无横向溢出，按钮保持适合手指点击。
- 补充 Image2 原创素材提示词，方便后续替换正式 PNG 素材。
- 增加网页 title、meta description 和 SVG favicon。

## 第三阶段优化

- 增加 3 个关卡与通关流程。
- 增加累计总分、本关分数、combo 连击和时间奖励。
- 使用 `localStorage` 保存本地最高分。
- 优化结果弹窗，显示关卡结果、本关得分、总分、最高分、新纪录、下一关、重试和回首页。
- 整理正式素材目录：`public/assets/goose`、`items`、`background`、`ui`、`sfx`。

## 第四阶段素材接入

- 新增 `src/data/assets.ts` 统一管理所有图片与音效路径。
- 新增 `AssetImage` fallback 组件：优先显示 PNG，加载失败时自动显示 emoji。
- 首页增加封面区，可替换 `public/assets/background/cover.png` 与 `public/assets/goose/goose-main.png`。
- 三个关卡支持不同背景：第 1 关清晨草地感，第 2 关午后农场桌面，第 3 关傍晚终极挑战。
- 当前没有正式 PNG 也能正常运行，背景会使用 CSS 渐层与装饰元素，物品会使用 emoji。

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

当前项目包含 `vercel.json`，可直接使用：

```bash
vercel --prod
```

关键配置：

- Install Command：`npm install`
- Build Command：`npm run build`
- Output Directory：`dist`
- Development Command：`npm run dev`

部署后请验证首页能打开、游戏能开始、手机浏览器可点击、刷新后没有白屏，控制台没有明显报错。

## 视觉资源

当前版本使用 emoji、CSS 图形与 SVG favicon 作为可运行占位素材，确保项目不依赖外部图片也能正常游玩。正式素材可根据 [docs/image2-prompts.md](docs/image2-prompts.md) 的原创 Image2 提示词生成后替换到 [public/assets](public/assets)。素材目录已预留 `goose/`、`items/`、`background/`、`ui/`、`sfx/`。

### 如何替换正式 PNG

1. 按 `docs/image2-prompts.md` 生成对应素材。
2. 把文件放到 `public/assets` 对应目录，文件名与 `src/data/assets.ts` 保持一致。
3. 重新执行 `npm run build`。
4. 如果图片缺失或路径错误，游戏仍会 fallback 到 emoji / CSS，不会白屏。

常用文件名：

- `public/assets/goose/goose-main.png`
- `public/assets/goose/goose-win.png`
- `public/assets/goose/goose-fail.png`
- `public/assets/background/bg-level-1.png`
- `public/assets/background/bg-level-2.png`
- `public/assets/background/bg-level-3.png`
- `public/assets/background/cover.png`
- `public/assets/items/item-carrot.png`
- `public/assets/items/item-bucket.png`
- `public/assets/ui/tray-basket.png`

## 后续可扩展功能

- 连击奖励与更夸张的消除动画
- 本地排行榜与最佳成绩
- 每日挑战
- PWA 手机桌面安装
- 正式原创 PNG 素材与音效包
- 更精细的遮挡和碰撞判断
