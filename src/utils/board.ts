import { BoardItem, ITEM_TYPES, LevelConfig } from '../data/gameConfig';

const shuffle = <T,>(items: T[]): T[] => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const createBoard = (level: LevelConfig): BoardItem[] => {
  const selected = ITEM_TYPES.slice(0, 8);
  const pool = selected.flatMap((item) =>
    Array.from({ length: item.id === 'goose' ? level.gooseRepeats : level.itemRepeats }, () => item)
  );

  return shuffle(pool).map((item, index) => {
    const layer = Math.floor(index / level.slotsPerLayer);
    const slot = index % level.slotsPerLayer;
    const column = slot % level.columns;
    const row = Math.floor(slot / level.columns);
    const jitterX = Math.random() * 4 - 2;
    const jitterY = Math.random() * 4 - 2;

    return {
      id: `${item.id}-${index}-${Math.random().toString(36).slice(2, 7)}`,
      type: item.id,
      label: item.label,
      emoji: item.emoji,
      x: 12 + column * level.xGap + jitterX + (layer % 2) * level.layerOffsetX,
      y: 18 + row * level.yGap + layer * level.layerOffsetY + jitterY,
      layer,
      rotation: Math.random() * 32 - 16,
      size: level.itemSize + Math.random() * 5
    };
  });
};

export const isCovered = (item: BoardItem, board: BoardItem[], level: LevelConfig): boolean => {
  return board.some((other) => {
    if (other.id === item.id || other.layer <= item.layer) return false;
    const dx = Math.abs(other.x - item.x);
    const dy = Math.abs(other.y - item.y);
    return dx < level.coverDx && dy < level.coverDy;
  });
};

export const shuffleBoardPositions = (board: BoardItem[]): BoardItem[] => {
  const positions = shuffle(board.map(({ x, y, layer, rotation }) => ({ x, y, layer, rotation })));
  return board.map((item, index) => ({ ...item, ...positions[index] }));
};
