import { ItemTypeId } from './gameConfig';

const asset = (path: string) => `/assets/${path}`;

export const imageAssets = {
  goose: {
    main: asset('goose/goose-main.png'),
    win: asset('goose/goose-win.png'),
    fail: asset('goose/goose-fail.png')
  },
  items: {
    carrot: asset('items/item-carrot.png'),
    cabbage: asset('items/item-cabbage.png'),
    corn: asset('items/item-corn.png'),
    bucket: asset('items/item-bucket.png'),
    boot: asset('items/item-boot.png'),
    egg: asset('items/item-egg.png'),
    hay: asset('items/item-hay.png'),
    feed: asset('items/item-feed.png')
  } satisfies Record<ItemTypeId, string>,
  background: {
    level1: asset('background/bg-level-1.png'),
    level2: asset('background/bg-level-2.png'),
    level3: asset('background/bg-level-3.png'),
    cover: asset('background/cover.png')
  },
  ui: {
    cover: asset('ui/cover.png'),
    trayBasket: asset('ui/tray-basket.png'),
    buttonStart: asset('ui/button-start.png'),
    panelResult: asset('ui/panel-result.png'),
    iconScore: asset('ui/icon-score.png'),
    iconCombo: asset('ui/icon-combo.png'),
    iconTimer: asset('ui/icon-timer.png'),
    pwaIcon192: asset('ui/pwa-icon-192.png'),
    pwaIcon512: asset('ui/pwa-icon-512.png')
  },
  sfx: {
    click: asset('sfx/click.mp3'),
    match: asset('sfx/match.mp3'),
    win: asset('sfx/win.mp3'),
    fail: asset('sfx/fail.mp3'),
    tool: asset('sfx/tool.mp3')
  }
} as const;

export const getItemImage = (type: ItemTypeId) => imageAssets.items[type];
export const getLevelBackground = (levelId: number) =>
  levelId === 1 ? imageAssets.background.level1 : levelId === 2 ? imageAssets.background.level2 : imageAssets.background.level3;
