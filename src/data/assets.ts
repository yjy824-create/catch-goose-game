import { ItemTypeId } from './gameConfig';

const asset = (path: string) => `/assets/${path}`;

export const imageAssets = {
  goose: {
    main: asset('goose/goose-main.png'),
    win: asset('goose/goose-win.png'),
    fail: asset('goose/goose-fail.png')
  },
  items: {
    goose: asset('items/item-goose.png'),
    corn: asset('items/item-corn.png'),
    carrot: asset('items/item-carrot.png'),
    fish: asset('items/item-fish.png'),
    apple: asset('items/item-apple.png'),
    bread: asset('items/item-bread.png'),
    leaf: asset('items/item-leaf.png'),
    bucket: asset('items/item-bucket.png')
  } satisfies Record<ItemTypeId, string>,
  background: {
    level1: asset('background/bg-level-1.png'),
    level2: asset('background/bg-level-2.png'),
    level3: asset('background/bg-level-3.png'),
    cover: asset('background/cover.png')
  },
  ui: {
    trayBasket: asset('ui/tray-basket.png'),
    buttonStart: asset('ui/button-start.png')
  },
  sfx: {
    tap: asset('sfx/tap.mp3'),
    match: asset('sfx/match.mp3'),
    win: asset('sfx/win.mp3'),
    lose: asset('sfx/lose.mp3')
  }
} as const;

export const getItemImage = (type: ItemTypeId) => imageAssets.items[type];
export const getLevelBackground = (levelId: number) =>
  levelId === 1 ? imageAssets.background.level1 : levelId === 2 ? imageAssets.background.level2 : imageAssets.background.level3;

