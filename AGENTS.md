# AGENTS.md — Codex 全流程执行说明

项目名称：抓大鹅 Catch Goose Game
技术栈：Vite + React + TypeScript + CSS
部署目标：GitHub + Vercel
执行目标：从 0 建立本地项目、完成游戏、测试、提交 GitHub、部署 Vercel，并交付成品链接。

---

## 0. 项目定位

这是一个网页端休闲小游戏，灵感来自「抓大鹅」类三消收纳玩法，但必须使用原创 UI、原创素材、原创代码，不复制任何现有游戏的美术、商标、音效、关卡或完整界面。

核心体验：
1. 画面中有一堆叠放物品。
2. 玩家只能点击没有被上层遮挡的物品。
3. 点击物品后，物品进入下方收纳栏。
4. 下方收纳栏中凑满 3 个相同物品后自动消除。
5. 清空桌面与收纳栏后，显示「成功抓到大鹅」。
6. 如果倒计时结束或下方栏位满了，则游戏失败。

---

## 1. 参考玩法研究结论

Codex 执行时请遵循以下玩法方向：

- 游戏类型：休闲益智、三消收纳、叠放物品消除。
- 目标：通过匹配相同物品并消除，最终抓住大鹅。
- 常见规则：选择相同物品，凑成 3 个后消除。
- 常见 UI：上方显示时间/分数，中间为叠放物品区，下方为收纳槽，旁边或底部有道具按钮。
- 常见道具：提示、移除、打乱。
- 可借鉴操作感：轻松、可爱、解压、手机端优先。

禁止：
- 不要复制任何第三方游戏截图。
- 不要使用现成游戏的 UI 皮肤、关卡数据、素材包。
- 不要在代码或 README 中宣称这是官方抓大鹅。
- 项目名称可以使用「抓大鹅」作为自制小游戏主题，但需要保持原创实现。

---

## 2. 本地从 0 开始建立项目

如果当前目录为空，按以下流程执行：

```bash
npm create vite@latest catch-goose-game -- --template react-ts
cd catch-goose-game
npm install
npm install lucide-react
```

如果已经有项目文件，则不要重复初始化，直接检查：

```bash
npm install
npm run dev
```

---

## 3. 目标目录结构

最终结构应接近如下：

```text
catch-goose-game/
├─ AGENTS.md
├─ README.md
├─ package.json
├─ index.html
├─ vite.config.ts
├─ tsconfig.json
├─ public/
│  └─ assets/
│     └─ README.md
├─ src/
│  ├─ main.tsx
│  ├─ App.tsx
│  ├─ components/
│  │  ├─ Header.tsx
│  │  ├─ GameBoard.tsx
│  │  ├─ Tray.tsx
│  │  ├─ ToolBar.tsx
│  │  └─ ResultModal.tsx
│  ├─ hooks/
│  │  └─ useGameLogic.ts
│  ├─ data/
│  │  └─ gameConfig.ts
│  ├─ utils/
│  │  └─ board.ts
│  └─ styles/
│     └─ global.css
└─ docs/
   ├─ image2-prompts.md
   ├─ gameplay-spec.md
   └─ deployment-checklist.md
```

---

## 4. 游戏功能规格

### 4.1 必做功能

- 开始游戏
- 倒数计时
- 分数计算
- 随机生成叠放物品
- 判断物品是否被遮挡
- 点击可选物品进入下方栏位
- 下方栏位最多 7 格
- 3 个相同物品自动消除
- 清空后胜利
- 栏位满或时间到失败
- 再玩一次
- 手机端适配

### 4.2 道具功能

- 提示：提示当前建议点击的物品类型
- 打乱：重新排列桌面剩余物品，扣分
- 移除：移除一个可点击物品，扣分

### 4.3 分数规则

建议规则：

- 每点击一个正确可选物品：+10
- 每完成一组三消：额外 +60
- 胜利奖励：+500
- 剩余时间奖励：剩余秒数 × 5
- 使用打乱：-30
- 使用移除：-50

---

## 5. UI 设计规范

整体视觉：
- 可爱、轻松、农场感、明亮色系。
- 适合手机竖屏，桌面端居中显示手机宽度容器。
- 主色建议：奶油黄、草地绿、天空蓝、鹅黄色、木棕色。

页面结构：
1. 顶部：标题、时间、分数。
2. 提示栏：显示当前操作提示。
3. 中间：游戏主区域，使用池塘/草地/农场背景。
4. 物品：圆角卡片或小贴纸形式，带轻微旋转与叠放阴影。
5. 下方：7 个收纳槽。
6. 底部：提示、打乱、移除三个按钮。
7. 弹窗：开始、成功、失败状态。

交互要求：
- 可点击物品 hover/active 有放大反馈。
- 被遮挡物品颜色变暗。
- 手机点击区域不能太小，建议 48px 以上。
- 弹窗按钮清楚明显。

---

## 6. Image2 设计要求

如果使用 image2 或其他图片生成工具制作 UI/素材，必须遵守：

- 不要上传或复刻第三方游戏截图。
- 不要要求生成「一模一样的抓大鹅界面」。
- 使用原创描述：农场、池塘、小鹅、食材、小物件、可爱贴纸风。
- 输出素材建议透明 PNG。
- 统一风格：圆润、扁平插画、柔和阴影、手机游戏 UI。

需要生成的素材：
1. 游戏背景图：池塘 + 草地 + 农场小路。
2. 大鹅角色：可爱、白鹅、橘色嘴巴、表情调皮。
3. 物品图标：玉米、胡萝卜、小鱼、苹果、面包、叶子、水桶。
4. 开始弹窗插图：大鹅从草丛探头。
5. 成功弹窗插图：大鹅被抓到但表情可爱。

详细提示词见：`docs/image2-prompts.md`。

---

## 7. 开发执行顺序

Codex 必须按以下顺序执行，不要跳步：

### Step 1：确认环境

```bash
node -v
npm -v
git --version
```

Node 建议 18+。

### Step 2：安装依赖

```bash
npm install
```

### Step 3：本地运行

```bash
npm run dev
```

打开终端显示的本地地址，通常是：

```text
http://localhost:5173
```

### Step 4：实现或检查核心文件

重点检查：

- `src/App.tsx`
- `src/hooks/useGameLogic.ts`
- `src/utils/board.ts`
- `src/components/GameBoard.tsx`
- `src/components/Tray.tsx`
- `src/styles/global.css`

### Step 5：测试游戏流程

手动测试：

- 点击「开始游戏」是否进入游戏。
- 时间是否每秒递减。
- 点击被遮挡物品是否不允许进入栏位。
- 点击可选物品是否进入下方栏位。
- 3 个相同物品是否自动消除。
- 下方栏位满是否失败。
- 时间到是否失败。
- 清空桌面是否胜利。
- 再玩一次是否重置。
- 手机尺寸是否能正常操作。

### Step 6：执行 build

```bash
npm run build
```

如果 build 失败，必须修复 TypeScript 错误与路径错误。

### Step 7：预览生产版本

```bash
npm run preview
```

确认 `dist/` 可正常预览。

### Step 8：初始化 Git

```bash
git init
git add .
git commit -m "Initial catch goose game"
```

### Step 9：建立 GitHub 仓库

在 GitHub 创建新仓库，建议仓库名：

```text
catch-goose-game
```

不要勾选自动生成 README，避免冲突。

### Step 10：绑定远端并 push

把 `<YOUR_GITHUB_REPO_URL>` 换成实际仓库地址：

```bash
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

完成后确认：

```bash
git status
```

必须显示工作区干净。

### Step 11：部署 Vercel

1. 打开 Vercel。
2. 选择 Add New Project。
3. Import Git Repository。
4. 选择 GitHub 仓库 `catch-goose-game`。
5. Framework Preset：Vite。
6. Install Command：`npm install`。
7. Build Command：`npm run build`。
8. Output Directory：`dist`。
9. 点击 Deploy。

### Step 12：部署后验证

部署完成后测试：

- 首页能打开。
- 游戏能开始。
- 手机浏览器能点击。
- 刷新后没有白屏。
- 控制台没有明显报错。

---

## 8. 最终交付格式

Codex 完成后，必须回报以下内容：

```text
1. 本地运行是否成功：
2. npm run build 是否成功：
3. GitHub 仓库链接：
4. 当前 branch：
5. commit hash：
6. Vercel 部署链接：
7. 修改/新增的主要文件：
8. 仍需后续优化的项目：
```

---

## 9. 后续可扩展功能

第一版完成后，可以继续扩展：

- 多关卡
- 主题场景：农场、厨房、夜市、便利店
- 音效
- 连击动画
- 排行榜 localStorage
- 每日挑战
- 更真实的叠放碰撞判断
- PWA 手机桌面安装

---

## 10. 质量标准

成品必须满足：

- `npm run build` 成功。
- 没有 TypeScript 编译错误。
- 没有明显白屏。
- 手机端可玩。
- UI 不拥挤。
- README 清楚。
- AGENTS.md 能让 Codex 从 0 到部署照着执行。
