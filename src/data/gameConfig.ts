export const TRAY_LIMIT = 7;
export const ITEM_TYPES = [
  { id: 'goose', label: '大鵝', emoji: '🪿' },
  { id: 'corn', label: '玉米', emoji: '🌽' },
  { id: 'carrot', label: '胡蘿蔔', emoji: '🥕' },
  { id: 'fish', label: '小魚', emoji: '🐟' },
  { id: 'apple', label: '蘋果', emoji: '🍎' },
  { id: 'bread', label: '麵包', emoji: '🍞' },
  { id: 'leaf', label: '葉子', emoji: '🍃' },
  { id: 'bucket', label: '水桶', emoji: '🪣' }
] as const;

export type ItemTypeId = (typeof ITEM_TYPES)[number]['id'];
export type GameStatus = 'ready' | 'playing' | 'levelWon' | 'gameWon' | 'lost';

export type LevelConfig = {
  id: number;
  title: string;
  shortTitle: string;
  difficulty: '簡單' | '中等' | '困難';
  timeLimit: number;
  itemRepeats: number;
  gooseRepeats: number;
  columns: number;
  slotsPerLayer: number;
  xGap: number;
  yGap: number;
  layerOffsetX: number;
  layerOffsetY: number;
  itemSize: number;
  coverDx: number;
  coverDy: number;
  intro: string;
};

export const LEVELS: LevelConfig[] = [
  {
    id: 1,
    title: '農場初級挑戰',
    shortTitle: '第 1 關',
    difficulty: '簡單',
    timeLimit: 100,
    itemRepeats: 3,
    gooseRepeats: 3,
    columns: 5,
    slotsPerLayer: 15,
    xGap: 16,
    yGap: 18,
    layerOffsetX: 4,
    layerOffsetY: 6,
    itemSize: 50,
    coverDx: 12,
    coverDy: 14,
    intro: '先從農場小物開始，凑齊 3 個就能消除。'
  },
  {
    id: 2,
    title: '小院進階挑戰',
    shortTitle: '第 2 關',
    difficulty: '中等',
    timeLimit: 85,
    itemRepeats: 6,
    gooseRepeats: 3,
    columns: 5,
    slotsPerLayer: 15,
    xGap: 16,
    yGap: 17,
    layerOffsetX: 6,
    layerOffsetY: 7,
    itemSize: 49,
    coverDx: 13,
    coverDy: 15,
    intro: '小院物品變多了，留意被上層壓住的小角落。'
  },
  {
    id: 3,
    title: '大鵝終極挑戰',
    shortTitle: '第 3 關',
    difficulty: '困難',
    timeLimit: 70,
    itemRepeats: 9,
    gooseRepeats: 3,
    columns: 5,
    slotsPerLayer: 22,
    xGap: 15,
    yGap: 13,
    layerOffsetX: 7,
    layerOffsetY: 7,
    itemSize: 48,
    coverDx: 14,
    coverDy: 16,
    intro: '大鵝開始搗亂了，快速連續三消拿下終極挑戰。'
  }
];

export const HIGH_SCORE_KEY = 'catch-goose-high-score';

export type BoardItem = {
  id: string;
  type: ItemTypeId;
  label: string;
  emoji: string;
  x: number;
  y: number;
  layer: number;
  rotation: number;
  size: number;
};
