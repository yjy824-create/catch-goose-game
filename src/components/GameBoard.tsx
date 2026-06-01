import { BoardItem } from '../data/gameConfig';

type GameBoardProps = {
  board: BoardItem[];
  availableIds: Set<string>;
  pickedItemId: string | null;
  onPick: (item: BoardItem) => void;
};

const GameBoard = ({ board, availableIds, pickedItemId, onPick }: GameBoardProps) => {
  return (
    <section className="board" aria-label="抓大鵝遊戲區">
      <div className="farm-sun" />
      <div className="board-label">農場桌面</div>
      <div className="pond-glow" />
      {board
        .slice()
        .sort((a, b) => a.layer - b.layer)
        .map((item) => {
          const available = availableIds.has(item.id);
          return (
            <button
              key={item.id}
              className={`game-item ${available ? 'available' : 'locked'} ${
                pickedItemId === item.id ? 'picked' : ''
              }`}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                width: item.size,
                height: item.size,
                transform: `rotate(${item.rotation}deg)`,
                zIndex: item.layer + 1
              }}
              onClick={() => onPick(item)}
              aria-label={`${available ? '可選取' : '被遮擋'}：${item.label}`}
            >
              <span>{item.emoji}</span>
            </button>
          );
        })}
    </section>
  );
};

export default GameBoard;
