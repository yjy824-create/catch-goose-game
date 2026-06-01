import { useEffect, useMemo, useState } from 'react';
import { BoardItem, INITIAL_TIME, TRAY_LIMIT } from '../data/gameConfig';
import { createBoard, isCovered, shuffleBoardPositions } from '../utils/board';

export type GameStatus = 'ready' | 'playing' | 'won' | 'lost';

const clearTriples = (tray: BoardItem[]) => {
  let nextTray = [...tray];
  let cleared = 0;

  while (true) {
    const counts = nextTray.reduce<Record<string, number>>((acc, item) => {
      acc[item.type] = (acc[item.type] ?? 0) + 1;
      return acc;
    }, {});

    const tripleType = Object.keys(counts).find((type) => counts[type] >= 3);
    if (!tripleType) break;

    let removed = 0;
    nextTray = nextTray.filter((item) => {
      if (item.type === tripleType && removed < 3) {
        removed += 1;
        return false;
      }
      return true;
    });
    cleared += 3;
  }

  return { tray: nextTray, cleared };
};

const chooseHint = (available: BoardItem[], tray: BoardItem[]) => {
  const trayCounts = tray.reduce<Record<string, number>>((acc, item) => {
    acc[item.type] = (acc[item.type] ?? 0) + 1;
    return acc;
  }, {});

  return (
    available.find((item) => trayCounts[item.type] === 2) ??
    available.find((item) => trayCounts[item.type] === 1) ??
    available[0]
  );
};

const getResultMessage = (status: GameStatus, score: number) => {
  if (status === 'ready') {
    return '點選上層物品，湊滿三個相同物品即可消除，清空桌面就能抓到大鵝。';
  }
  if (status === 'won') {
    return `成功抓到大鵝！本局分數 ${score}。`;
  }
  return `挑戰失敗，本局分數 ${score}。整理下方欄位的節奏會更關鍵。`;
};

const clampScore = (value: number) => Math.max(0, value);

export const useGameLogic = () => {
  const [board, setBoard] = useState<BoardItem[]>(() => createBoard());
  const [tray, setTray] = useState<BoardItem[]>([]);
  const [status, setStatus] = useState<GameStatus>('ready');
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState(getResultMessage('ready', 0));

  const availableIds = useMemo(
    () => new Set(board.filter((item) => !isCovered(item, board)).map((item) => item.id)),
    [board]
  );

  const isPlaying = status === 'playing';

  useEffect(() => {
    if (!isPlaying) return;
    if (timeLeft <= 0) {
      setStatus('lost');
      setMessage('時間到！再試一次，先消明顯的物品。');
      return;
    }

    const timer = window.setTimeout(() => setTimeLeft((time) => time - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setBoard(createBoard());
    setTray([]);
    setStatus('playing');
    setTimeLeft(INITIAL_TIME);
    setScore(0);
    setMessage('遊戲開始！優先點選沒有被壓住的物品。');
  };

  const pickItem = (item: BoardItem) => {
    if (!isPlaying) return;
    if (!availableIds.has(item.id)) {
      setMessage('這個物品被蓋住了，先清掉上面的物品。');
      return;
    }

    const nextBoard = board.filter((boardItem) => boardItem.id !== item.id);
    const nextTrayRaw = [...tray, item];
    const { tray: nextTray, cleared } = clearTriples(nextTrayRaw);

    if (nextTray.length === TRAY_LIMIT) {
      setBoard(nextBoard);
      setTray(nextTray);
      setStatus('lost');
      setMessage('下方欄位滿了！注意不要亂點。');
      return;
    }

    const winBonus = nextBoard.length === 0 && nextTray.length === 0 ? 500 + timeLeft * 5 : 0;
    setBoard(nextBoard);
    setTray(nextTray);
    setScore((value) => value + 10 + (cleared / 3) * 60 + winBonus);

    if (winBonus) {
      setStatus('won');
      setMessage(`成功抓到大鵝！剩餘時間加成 +${winBonus}。`);
      return;
    }

    setMessage(cleared ? `三個「${item.label}」消除成功！` : `「${item.label}」已放入下方欄位。`);
  };

  const useHint = () => {
    if (!isPlaying) return;
    const available = board.filter((item) => availableIds.has(item.id));
    const best = chooseHint(available, tray);
    setMessage(best ? `提示：可以先找「${best.label}」。` : '目前沒有可點選物品。');
  };

  const useShuffle = () => {
    if (!isPlaying) return;
    setBoard((items) => shuffleBoardPositions(items));
    setScore((value) => clampScore(value - 30));
    setMessage('已打亂桌面，會扣 30 分。');
  };

  const useRemove = () => {
    if (!isPlaying) return;
    const item = board.find((boardItem) => availableIds.has(boardItem.id));
    if (!item) {
      setMessage('目前沒有可移除的上層物品。');
      return;
    }
    const nextBoard = board.filter((boardItem) => boardItem.id !== item.id);
    const winBonus = nextBoard.length === 0 && tray.length === 0 ? 500 + timeLeft * 5 : 0;

    setBoard(nextBoard);
    setScore((value) => clampScore(value - 50 + winBonus));
    if (winBonus) {
      setStatus('won');
      setMessage(`成功抓到大鵝！剩餘時間加成 +${winBonus}。`);
      return;
    }

    setMessage(`已移除一個「${item.label}」，會扣 50 分。`);
  };

  return {
    board,
    tray,
    status,
    timeLeft,
    score,
    message,
    isPlaying,
    resultMessage: getResultMessage(status, score),
    availableIds,
    startGame,
    pickItem,
    useHint,
    useShuffle,
    useRemove
  };
};
