# Assets

当前版本使用 emoji、CSS 与 SVG favicon 完成，不依赖外部图片，也不会因为缺少正式素材而无法运行。

正式素材生成后建议按以下目录放置：

- `goose/`：大鹅角色、胜利大鹅、失败大鹅、封面大鹅。
- `items/`：三消物品图标，例如玉米、胡萝卜、小鱼、苹果、面包、叶子、水桶。
- `background/`：第 1 关农场背景、第 2 关小院背景、第 3 关终极挑战背景。
- `ui/`：收纳篮、托盘、按钮、分数牌、弹窗框、装饰贴纸。
- `sfx/`：正式点击、三消、胜利、失败、按钮音效。

代码路径集中在 `src/data/assets.ts`，当前约定文件名：

- `goose/goose-main.png`
- `goose/goose-win.png`
- `goose/goose-fail.png`
- `background/bg-level-1.png`
- `background/bg-level-2.png`
- `background/bg-level-3.png`
- `background/cover.png`
- `items/item-goose.png`
- `items/item-corn.png`
- `items/item-carrot.png`
- `items/item-fish.png`
- `items/item-apple.png`
- `items/item-bread.png`
- `items/item-leaf.png`
- `items/item-bucket.png`
- `ui/tray-basket.png`
- `ui/button-start.png`
- `sfx/tap.mp3`
- `sfx/match.mp3`
- `sfx/win.mp3`
- `sfx/lose.mp3`

建议规范：

- 图片优先使用透明 PNG。
- 物品图标使用正方形画布，保留安全边距。
- 背景使用 9:16 竖屏比例。
- UI 元件保持鹅黄色、奶白色、浅橙色、草绿色的统一风格。
- 当前代码已经预留引用路径；文件不存在或加载失败时会自动 fallback 到 emoji / CSS。
