# Assets

当前版本可以在没有正式 PNG / MP3 的情况下运行：游戏会优先尝试读取 `src/data/assets.ts` 中登记的资源路径，图片缺失或加载失败时会回退到 emoji、CSS 渐层和现有 Web Audio API 音效，不会因为 404 素材而白屏或崩溃。

## 目录用途

- `goose/`：大鹅主角色、胜利大鹅、失败大鹅。
- `items/`：三消物品图标，必须使用正方形透明 PNG。
- `background/`：3 个关卡背景图。
- `ui/`：首页封面图、收纳篮、按钮、结果面板、分数 / combo / timer 图标。
- `sfx/`：正式点击、三消、胜利、失败、道具音效。

## 正式素材文件名清单

大鹅角色：

- `public/assets/goose/goose-main.png`
- `public/assets/goose/goose-win.png`
- `public/assets/goose/goose-fail.png`

背景：

- `public/assets/background/bg-level-1.png`
- `public/assets/background/bg-level-2.png`
- `public/assets/background/bg-level-3.png`

物品图标：

- `public/assets/items/item-carrot.png`
- `public/assets/items/item-cabbage.png`
- `public/assets/items/item-corn.png`
- `public/assets/items/item-bucket.png`
- `public/assets/items/item-boot.png`
- `public/assets/items/item-egg.png`
- `public/assets/items/item-hay.png`
- `public/assets/items/item-feed.png`

UI 素材：

- `public/assets/ui/cover.png`
- `public/assets/ui/tray-basket.png`
- `public/assets/ui/button-start.png`
- `public/assets/ui/panel-result.png`
- `public/assets/ui/icon-score.png`
- `public/assets/ui/icon-combo.png`
- `public/assets/ui/icon-timer.png`

音效素材预留：

- `public/assets/sfx/click.mp3`
- `public/assets/sfx/match.mp3`
- `public/assets/sfx/win.mp3`
- `public/assets/sfx/fail.mp3`
- `public/assets/sfx/tool.mp3`

## 替换规则

1. 文件名必须和上方清单、`src/data/assets.ts` 完全一致。
2. 把 Image2 生成的 PNG 放进对应目录后，不需要改代码，组件会自动优先显示正式图片。
3. 如果正式图片缺失、命名错误或加载失败，`AssetImage` 会显示对应 emoji fallback。
4. 背景图缺失时，关卡仍会显示 CSS 渐层背景。
5. 音效文件目前为预留路径，游戏仍使用 Web Audio API 生成音效；后续可在音效 hook 中接入 MP3。
6. 替换素材后执行 `npm run build`，通过后 push 到 GitHub，Vercel 会自动部署，也可以手动执行 `vercel --prod`。

## 建议规格

- 大鹅角色：`1024x1024`，透明背景 PNG。
- 物品图标：`512x512`，透明背景 PNG，主体居中并保留安全边距。
- 背景图：`1080x1920`，竖屏 9:16 PNG，不需要透明背景。
- UI 横向素材：按实际用途输出透明 PNG，例如收纳篮 `1600x360`。
- 音效：短 MP3，点击和道具 0.1-0.3 秒，三消 0.3-0.6 秒，胜利 / 失败 0.8-1.5 秒。
