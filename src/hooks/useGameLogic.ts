import { useEffect, useMemo, useRef, useState } from 'react';
import { BoardItem, INITIAL_TIME, ItemTypeId, TRAY_LIMIT } from '../data/gameConfig';
import { createBoard, isCovered, shuffleBoardPositions } from '../utils/board';
import { useSoundEffects } from './useSoundEffects';

export type GameStatus = 'ready' | 'playing' | 'won' | 'lost';

const findTripleType = (tray: BoardItem[]): ItemTypeId | null => {
  const counts = tray.reduce<Partial<Record<ItemTypeId, number>>>((acc, item) => {
    acc[item.type] = (acc[item.type] ?? 0) + 1;
    return acc;
  }, {});

  return (Object.keys(counts).find((type) => counts[type as ItemTypeId]! >= 3) as ItemTypeId | undefined) ?? null;
};

const removeTriple = (tray: BoardItem[], type: ItemTypeId) => {
  let removed = 0;
  return tray.filter((item) => {
    if (item.type === type && removed < 3) {
      removed += 1;
      return false;
    }
    return true;
  });
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
  const { play } = useSoundEffects();
  const [board, setBoard] = useState<BoardItem[]>(() => createBoard());
  const [tray, setTray] = useState<BoardItem[]>([]);
  const [status, setStatus] = useState<GameStatus>('ready');
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState(getResultMessage('ready', 0));
  const [clearingType, setClearingType] = useState<ItemTypeId | null>(null);
  const [pickedItemId, setPickedItemId] = useState<string | null>(null);
  const clearTimerRef = useRef<number | null>(null);

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
      play('lose');
      return;
    }

    const timer = window.setTimeout(() => setTimeLeft((time) => time - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [isPlaying, play, timeLeft]);

  useEffect(() => {
    return () => {
      if (clearTimerRef.current) {
        window.clearTimeout(clearTimerRef.current);
      }
    };
  }, []);

  const startGame = () => {
    if (clearTimerRef.current) {
      window.clearTimeout(clearTimerRef.current);
    }
    setBoard(createBoard());
    setTray([]);
    setStatus('playing');
    setTimeLeft(INITIAL_TIME);
    setScore(0);
    setClearingType(null);
    setPickedItemId(null);
    setMessage('第 1 關開始！凑齊 3 個相同物品就能消除。');
    play('tool');
  };

  const pickItem = (item: BoardItem) => {
    if (!isPlaying || clearingType) return;
    if (!availableIds.has(item.id)) {
      setMessage('這個物品被蓋住了，先清掉上面的物品。');
      return;
    }

    const nextBoard = board.filter((boardItem) => boardItem.id !== item.id);
    const nextTrayRaw = [...tray, item];
    const tripleType = findTripleType(nextTrayRaw);
    play('tap');
    setPickedItemId(item.id);
    window.setTimeout(() => setPickedItemId(null), 180);

    if (!tripleType && nextTrayRaw.length === TRAY_LIMIT) {
      setBoard(nextBoard);
      setTray(nextTrayRaw);
      setStatus('lost');
      setMessage('小籃子塞滿了！下次先湊三個再裝。');
      play('lose');
      return;
    }

    setBoard(nextBoard);
    setTray(nextTrayRaw);
    setScore((value) => value + 10);

    if (tripleType) {
      setClearingType(tripleType);
      setMessage(`三個「${item.label}」集合！小籃子正在清空。`);
      play('match');
      clearTimerRef.current = window.setTimeout(() => {
        const resolvedTray = removeTriple(nextTrayRaw, tripleType);
        const winBonus = nextBoard.length === 0 && resolvedTray.length === 0 ? 500 + timeLeft * 5 : 0;

        setTray(resolvedTray);
        setClearingType(null);
        setScore((value) => value + 60 + winBonus);

        if (winBonus) {
          setStatus('won');
          setMessage(`成功抓到大鵝！剩餘時間加成 +${winBonus}。`);
          play('win');
          return;
        }

        setMessage('三消成功！繼續整理桌上的小物件。');
      }, 280);
      return;
    }

    if (nextBoard.length === 0 && nextTrayRaw.length === 0) {
      const winBonus = 500 + timeLeft * 5;
      setStatus('won');
      setScore((value) => value + winBonus);
      setMessage(`成功抓到大鵝！剩餘時間加成 +${winBonus}。`);
      play('win');
      return;
    }

    setMessage(`「${item.label}」放進小籃子了，凑齊 3 個就會消除。`);
  };

  const useHint = () => {
    if (!isPlaying || clearingType) return;
    const available = board.filter((item) => availableIds.has(item.id));
    const best = chooseHint(available, tray);
    setMessage(best ? `提示：可以先找「${best.label}」。` : '目前沒有可點選物品。');
    play('tool');
  };

  const useShuffle = () => {
    if (!isPlaying || clearingType) return;
    setBoard((items) => shuffleBoardPositions(items));
    setScore((value) => clampScore(value - 30));
    setMessage('已打亂桌面，會扣 30 分。');
    play('tool');
  };

  const useRemove = () => {
    if (!isPlaying || clearingType) return;
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
      play('win');
      return;
    }

    setMessage(`已移除一個「${item.label}」，會扣 50 分。`);
    play('tool');
  };

  return {
    board,
    tray,
    status,
    timeLeft,
    score,
    message,
    isPlaying,
    clearingType,
    pickedItemId,
    isBusy: Boolean(clearingType),
    resultMessage: getResultMessage(status, score),
    availableIds,
    startGame,
    pickItem,
    useHint,
    useShuffle,
    useRemove
  };
};
