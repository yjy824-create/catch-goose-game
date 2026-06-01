# Image2 设计提示词

以下提示词用于生成原创素材。不要上传、引用或复刻任何第三方游戏截图，不要要求生成「一模一样的抓大鹅界面」，不要包含商标、Logo、文字或现成游戏 UI 皮肤。

统一风格关键词：原创、可爱、魔性、农场小院、池塘、鹅黄色、奶白色、浅橙色、草绿色、圆润扁平插画、柔和阴影、手机休闲小游戏、透明 PNG。

## 1. 大鹅角色

```text
Create an original cute white goose mascot for a mobile casual puzzle game, playful mischievous face, orange beak and feet, slightly chubby rounded body, tiny farm scarf, flat cartoon sticker style, soft warm shadow, transparent background, no text, no logo, front 3/4 view, consistent pastel lighting.
```

## 2. 农场背景

```text
Create an original vertical 9:16 mobile game background, cozy farm courtyard table beside a small pond, soft green grass, warm yellow sunlight, small wooden fence, simple farm path, cute rounded cartoon style, clean center area for game objects, pastel goose yellow, cream, light orange, grass green, no text, no logo.
```

## 3. 收纳篮 / 托盘

```text
Create an original cute collection basket UI asset for a mobile match-3 storage game, horizontal seven-slot wicker tray, warm brown basket rim, cream slot interiors, rounded cartoon style, soft shadows, transparent background, no text, no logo, designed to sit at the bottom of a phone game screen.
```

## 4. 游戏图标物品套组

```text
Create a consistent set of original cute cartoon item icons for a farm collection puzzle game: carrot, cabbage, corn, blue bucket, rain boot, goose egg, hay bundle, feed beans, all as rounded sticker icons with cream outlines, soft drop shadow, transparent background, same angle and lighting, no text, no logo.
```

## 5. 胜利弹窗插图

```text
Create an original cute victory popup illustration for a mobile puzzle game: a happy white goose sitting safely in a small basket, yellow stars, tiny confetti, warm farm colors, playful but friendly expression, rounded flat cartoon style, transparent background, no text, no logo.
```

## 6. 失败弹窗插图

```text
Create an original funny failure popup illustration for a mobile puzzle game: a confused cute white goose peeking over an overflowing basket of farm items, lighthearted expression, no sadness, rounded cartoon style, warm pastel colors, transparent background, no text, no logo.
```

## 7. 开始弹窗插图

```text
Create an original cute start popup illustration: a white goose peeking from tall grass near a pond in a farm courtyard, playful and inviting, rounded flat cartoon sticker style, pastel colors, transparent background, no text, no logo.
```

## 8. UI 整体参考

```text
Design an original vertical mobile casual match-3 collection game UI, cute farm courtyard and pond theme, bold title area, top timer and score cards, center layered pile of rounded item stickers, bottom seven-slot basket tray, three chunky tool buttons, goose yellow, cream, light orange, grass green, soft shadows, no text, no logo, no copied game interface.
```

---

# 第三阶段正式素材提示词

以下提示词用于正式替换 `public/assets` 目录中的素材。所有素材都必须原创，风格统一，适合手机小游戏。

## 9. 第 1 关背景图：农场初级挑战

```text
Create an original 9:16 vertical mobile game background for level 1, beginner farm challenge, sunny farm tabletop beside a small pond, soft grass, cream yellow sunlight, simple wooden fence, clean open center for puzzle items, cute quirky farmyard feeling, rounded flat cartoon style, pastel goose yellow, cream, light orange, grass green, no text, no logo, PNG game background.
```

## 10. 第 2 关背景图：小院进阶挑战

```text
Create an original 9:16 vertical mobile game background for level 2, cozy farm courtyard advanced challenge, more garden props around the edges, stone path, low fence, pond corner, soft afternoon light, center area clear for stacked item stickers, cute mischievous casual game mood, rounded flat cartoon style, unified pastel colors, no text, no logo, PNG game background.
```

## 11. 第 3 关背景图：大鹅终极挑战

```text
Create an original 9:16 vertical mobile game background for level 3, final goose challenge, lively farm courtyard with dramatic warm sunlight, pond sparkle, scattered hay and small wooden crates around edges, clear center for dense puzzle items, cute chaotic but readable mobile game background, goose yellow, cream, orange, grass green, rounded cartoon style, no text, no logo, PNG background.
```

## 12. 大鹅胜利插图

```text
Create an original victory illustration asset for a mobile casual puzzle game, cute white goose proudly sitting in a wicker basket, stars and confetti, playful triumphant expression, orange beak and feet, rounded flat cartoon sticker style, transparent background, soft shadow, no text, no logo, PNG popup illustration.
```

## 13. 大鹅失败插图

```text
Create an original funny failure illustration asset for a mobile casual puzzle game, cute white goose confused but cheerful, peeking over an overflowing basket of farm items, lighthearted expression, no sadness, rounded flat cartoon sticker style, transparent background, soft shadow, no text, no logo, PNG popup illustration.
```

## 14. 三消物品图标

```text
Create a unified set of square PNG item icons for a mobile match-3 collection game: carrot, cabbage, corn, blue bucket, rain boot, goose egg, hay bundle, and feed beans, centered on transparent background, rounded sticker style, cream outline, soft drop shadow, consistent light source, cute farmyard feeling, no text, no logo.
```

## 15. UI 按钮素材

```text
Create original mobile game UI button assets, chunky rounded buttons in goose yellow, grass green, and warm coral orange, subtle 3D bottom shadow, cream highlight, designed for hint, shuffle, remove, next level, retry, and home actions, transparent background, no text, no icons, no logo, PNG UI kit.
```

## 16. 游戏封面图

```text
Create an original mobile game cover illustration for Catch Goose style casual puzzle game, cute white goose in a sunny farm courtyard, stacked farm item stickers, wicker basket tray, playful and shareable, vertical 9:16 composition, bold empty space for title overlay, goose yellow, cream, light orange, grass green, rounded flat cartoon style, no text, no logo, PNG cover art.
```

---

# 第四阶段正式素材生产清单

把生成好的文件放进 `public/assets` 对应目录即可。代码中的路径统一由 `src/data/assets.ts` 管理，图片不存在或加载失败时会自动 fallback 到 emoji / CSS。

| 文件名 | 建议尺寸 | 透明背景 | 目录 | 用途 |
|---|---:|---|---|---|
| `goose-main.png` | 1024x1024 | 是 | `public/assets/goose/` | 首页封面与开始弹窗主视觉 |
| `goose-win.png` | 1024x1024 | 是 | `public/assets/goose/` | 胜利 / 最终通关弹窗 |
| `goose-fail.png` | 1024x1024 | 是 | `public/assets/goose/` | 失败弹窗 |
| `bg-level-1.png` | 1080x1920 | 否 | `public/assets/background/` | 第 1 关清晨农场小院背景 |
| `bg-level-2.png` | 1080x1920 | 否 | `public/assets/background/` | 第 2 关午后农场桌面背景 |
| `bg-level-3.png` | 1080x1920 | 否 | `public/assets/background/` | 第 3 关傍晚终极挑战背景 |
| `cover.png` | 1080x1920 | 否 | `public/assets/background/` | 游戏封面背景 |
| `item-carrot.png` | 512x512 | 是 | `public/assets/items/` | 胡萝卜图标 |
| `item-cabbage.png` | 512x512 | 是 | `public/assets/items/` | 高丽菜图标 |
| `item-corn.png` | 512x512 | 是 | `public/assets/items/` | 玉米图标 |
| `item-bucket.png` | 512x512 | 是 | `public/assets/items/` | 水桶图标 |
| `item-boot.png` | 512x512 | 是 | `public/assets/items/` | 雨靴图标 |
| `item-egg.png` | 512x512 | 是 | `public/assets/items/` | 鹅蛋图标 |
| `item-hay.png` | 512x512 | 是 | `public/assets/items/` | 干草图标 |
| `item-feed.png` | 512x512 | 是 | `public/assets/items/` | 饲料图标 |
| `tray-basket.png` | 1600x360 | 是 | `public/assets/ui/` | 下方 7 格收纳篮 |
| `button-start.png` | 800x240 | 是 | `public/assets/ui/` | 开始按钮材质 |
| `panel-result.png` | 1200x900 | 是 | `public/assets/ui/` | 胜利 / 失败结果面板 |
| `icon-score.png` | 512x512 | 是 | `public/assets/ui/` | 分数图标 |
| `icon-combo.png` | 512x512 | 是 | `public/assets/ui/` | 连击图标 |
| `icon-timer.png` | 512x512 | 是 | `public/assets/ui/` | 倒计时图标 |
| `click.mp3` | 0.1-0.3 秒 | 不适用 | `public/assets/sfx/` | 点击物品音效 |
| `match.mp3` | 0.3-0.6 秒 | 不适用 | `public/assets/sfx/` | 三消音效 |
| `win.mp3` | 0.8-1.5 秒 | 不适用 | `public/assets/sfx/` | 胜利音效 |
| `fail.mp3` | 0.5-1.0 秒 | 不适用 | `public/assets/sfx/` | 失败音效 |
| `tool.mp3` | 0.1-0.3 秒 | 不适用 | `public/assets/sfx/` | 道具音效 |

## 单张物品图标提示词模板

```text
Create one original square PNG icon for a cute mobile match-3 farm collection game: [ITEM NAME], centered on transparent background, rounded sticker style, cream outline, soft drop shadow, goose yellow and grass green friendly palette, consistent lighting, no text, no logo, suitable for public/assets/items/[FILE NAME].
```

## 每关背景差异提示

- 第 1 关：清晨、草地、明亮、留白多，适合新手。
- 第 2 关：午后、小院、桌面杂物边缘更多，但中心仍然清楚。
- 第 3 关：傍晚、橙色光、更热闹更紧张，但保持可爱和可读性。

---

# 第五阶段 Image2 可复制生产提示词

以下清单和 `src/data/assets.ts`、`public/assets/README.md` 保持一致。生成后按文件名放入对应目录即可，缺失文件会由游戏 fallback 到 emoji / CSS。

## 大鹅角色 PNG

`public/assets/goose/goose-main.png`

```text
Create an original cute white goose mascot PNG for a mobile farm courtyard match-3 game, mischievous friendly expression, orange beak and feet, rounded chubby body, tiny yellow scarf, soft sticker shadow, transparent background, 1024x1024 square, no text, no logo, no copyrighted character, no trademark.
```

`public/assets/goose/goose-win.png`

```text
Create an original cute white goose victory PNG for a mobile farm courtyard match-3 game, goose happily sitting in a small wicker basket with stars and confetti, playful triumphant expression, warm goose yellow and grass green palette, rounded flat cartoon sticker style, transparent background, 1024x1024 square, no text, no logo, no copyrighted character.
```

`public/assets/goose/goose-fail.png`

```text
Create an original funny white goose failure PNG for a mobile farm courtyard match-3 game, goose peeking from an overflowing basket of farm items, confused but cheerful face, lighthearted and not sad, rounded flat cartoon sticker style, transparent background, 1024x1024 square, no text, no logo, no copyrighted character.
```

## 背景 PNG

`public/assets/background/cover.png`

```text
Create an original vertical mobile game cover background PNG, 1080x1920, sunny cute farm courtyard with grass, small pond, wooden fence, wicker basket and playful goose feeling, clear central space for title overlay, goose yellow, cream, light orange and grass green palette, rounded flat cartoon style, no text, no logo, no brand.
```

`public/assets/background/bg-level-1.png`

```text
Create an original 9:16 vertical PNG mobile game background, level 1 beginner farm challenge, early morning grass courtyard, soft sunlight, tiny pond corner, simple fence, clean open center for puzzle items, cute farmyard mood, pastel goose yellow, cream, light orange, grass green, no text, no logo, no brand.
```

`public/assets/background/bg-level-2.png`

```text
Create an original 9:16 vertical PNG mobile game background, level 2 farm courtyard advanced challenge, afternoon farm tabletop feeling, more small props around the edges, hay, bucket, fence, pond sparkle, center area kept readable for stacked item icons, cute mischievous mobile game style, no text, no logo, no brand.
```

`public/assets/background/bg-level-3.png`

```text
Create an original 9:16 vertical PNG mobile game background, level 3 final goose challenge, warm evening farm courtyard, orange sunset glow, grass and pond accents, scattered hay and small crates around edges, energetic but still cute, clear center for dense puzzle items, no text, no logo, no brand.
```

## 物品图标 PNG

`public/assets/items/item-carrot.png`

```text
Create one original square PNG icon for a cute mobile match-3 farm collection game: a bright carrot, centered on transparent background, rounded sticker style, cream outline, soft drop shadow, consistent pastel farm lighting, 512x512, no text, no logo, no brand.
```

`public/assets/items/item-cabbage.png`

```text
Create one original square PNG icon for a cute mobile match-3 farm collection game: a round green cabbage, centered on transparent background, rounded sticker style, cream outline, soft drop shadow, consistent pastel farm lighting, 512x512, no text, no logo, no brand.
```

`public/assets/items/item-corn.png`

```text
Create one original square PNG icon for a cute mobile match-3 farm collection game: a yellow corn cob with green leaves, centered on transparent background, rounded sticker style, cream outline, soft drop shadow, consistent pastel farm lighting, 512x512, no text, no logo, no brand.
```

`public/assets/items/item-bucket.png`

```text
Create one original square PNG icon for a cute mobile match-3 farm collection game: a small blue farm bucket, centered on transparent background, rounded sticker style, cream outline, soft drop shadow, consistent pastel farm lighting, 512x512, no text, no logo, no brand.
```

`public/assets/items/item-boot.png`

```text
Create one original square PNG icon for a cute mobile match-3 farm collection game: a small orange rain boot, centered on transparent background, rounded sticker style, cream outline, soft drop shadow, consistent pastel farm lighting, 512x512, no text, no logo, no brand.
```

`public/assets/items/item-egg.png`

```text
Create one original square PNG icon for a cute mobile match-3 farm collection game: a cream goose egg with tiny warm highlight, centered on transparent background, rounded sticker style, cream outline, soft drop shadow, consistent pastel farm lighting, 512x512, no text, no logo, no brand.
```

`public/assets/items/item-hay.png`

```text
Create one original square PNG icon for a cute mobile match-3 farm collection game: a small bundle of golden hay tied with twine, centered on transparent background, rounded sticker style, cream outline, soft drop shadow, consistent pastel farm lighting, 512x512, no text, no logo, no brand.
```

`public/assets/items/item-feed.png`

```text
Create one original square PNG icon for a cute mobile match-3 farm collection game: a cute pile of feed beans in warm tan and brown colors, centered on transparent background, rounded sticker style, cream outline, soft drop shadow, consistent pastel farm lighting, 512x512, no text, no logo, no brand.
```

## UI PNG

`public/assets/ui/tray-basket.png`

```text
Create an original transparent PNG mobile game tray asset, horizontal seven-slot wicker basket, warm brown rim, cream slot interiors, rounded cartoon style, soft shadow, designed for the bottom of a phone screen, 1600x360, no text, no logo, no brand.
```

`public/assets/ui/button-start.png`

```text
Create an original transparent PNG mobile game start button background, chunky rounded pill shape, goose yellow top surface, warm orange lower shadow, cream highlight, tactile cute farm game style, 800x240, no text, no icon, no logo, no brand.
```

`public/assets/ui/panel-result.png`

```text
Create an original transparent PNG result popup panel for a cute mobile farm match-3 game, rounded cream card with goose yellow border, small grass and confetti decorations, soft drop shadow, center area empty for UI text, 1200x900, no text, no logo, no brand.
```

`public/assets/ui/icon-score.png`

```text
Create one original transparent square PNG UI icon for score in a cute farm mobile game, small golden star coin with soft shine, rounded sticker style, cream outline, 512x512, no text, no logo, no brand.
```

`public/assets/ui/icon-combo.png`

```text
Create one original transparent square PNG UI icon for combo in a cute farm mobile game, three small sparkling item tiles grouped together, energetic but readable, rounded sticker style, cream outline, 512x512, no text, no logo, no brand.
```

`public/assets/ui/icon-timer.png`

```text
Create one original transparent square PNG UI icon for timer in a cute farm mobile game, small alarm clock with goose yellow face and grass green accent, rounded sticker style, cream outline, 512x512, no text, no logo, no brand.
```

## 音效 MP3 生成方向

- `public/assets/sfx/click.mp3`：short soft pop tap sound, cute mobile game, 0.1-0.3 seconds, no voice, no melody from existing songs.
- `public/assets/sfx/match.mp3`：sparkly triple-match chime, cute farm puzzle game, 0.3-0.6 seconds, no voice, no copyrighted melody.
- `public/assets/sfx/win.mp3`：short cheerful victory jingle, cute farm puzzle game, 0.8-1.5 seconds, original melody only.
- `public/assets/sfx/fail.mp3`：funny gentle failure wobble sound, not harsh, 0.5-1.0 seconds, no voice, original.
- `public/assets/sfx/tool.mp3`：quick utility button blip, light and playful, 0.1-0.3 seconds, no voice, original.
