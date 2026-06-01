export const TRAY_LIMIT = 7;
export const INITIAL_TIME = 90;
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
