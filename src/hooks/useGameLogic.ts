import { useEffect, useMemo, useRef, useState } from 'react';
import { BoardItem, GameStatus, HIGH_SCORE_KEY, ItemTypeId, LEVELS, TRAY_LIMIT } from '../data/gameConfig';
import { createBoard, isCovered, shuffleBoardPositions } from '../utils/board';
import { useSoundEffects } from './useSoundEffects';

export type ResultSummary = {
  status: Exclude<GameStatus, 'ready' | 'playing'>;
  levelTitle: string;
  levelNumber: number;
  levelScore: number;
  totalScore: number;
  highScore: number;
  isNewRecord: boolean;
  timeBonus: number;
  message: string;
};

const readHighScore = () => {
  if (typeof window === 'undefined') return 0;
  const value = window.localStorage.getItem(HIGH_SCORE_KEY);
  return value ? Number.parseInt(value, 10) || 0 : 0;
};

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

const clampScore = (value: number) => Math.max(0, value);
const comboScore = (combo: number) => 10 + Math.max(0, combo - 1) * 5;

export const useGameLogic = () => {
  const { play, soundEnabled, soundVolume, setSoundVolume, toggleSound } = useSoundEffects();
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const currentLevel = LEVELS[currentLevelIndex];
  const [board, setBoard] = useState<BoardItem[]>(() => createBoard(LEVELS[0]));
  const [tray, setTray] = useState<BoardItem[]>([]);
  const [status, setStatus] = useState<GameStatus>('ready');
  const [timeLeft, setTimeLeft] = useState(LEVELS[0].timeLimit);
  const [totalScore, setTotalScore] = useState(0);
  const [levelScore, setLevelScore] = useState(0);
  const [levelStartScore, setLevelStartScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [highScore, setHighScore] = useState(readHighScore);
  const [message, setMessage] = useState('準備好就開始第 1 關，連續三消可以累積 combo。');
  const [clearingType, setClearingType] = useState<ItemTypeId | null>(null);
  const [pickedItemId, setPickedItemId] = useState<string | null>(null);
  const [resultSummary, setResultSummary] = useState<ResultSummary | null>(null);
  const clearTimerRef = useRef<number | null>(null);

  const availableIds = useMemo(
    () => new Set(board.filter((item) => !isCovered(item, board, currentLevel)).map((item) => item.id)),
    [board, currentLevel]
  );

  const isPlaying = status === 'playing';
  const isFinalLevel = currentLevelIndex === LEVELS.length - 1;

  const clearPendingTimer = () => {
    if (clearTimerRef.current) {
      window.clearTimeout(clearTimerRef.current);
      clearTimerRef.current = null;
    }
  };

  const updateHighScore = (score: number) => {
    const nextHighScore = Math.max(highScore, score);
    const isNewRecord = score > highScore;
    if (isNewRecord && typeof window !== 'undefined') {
      window.localStorage.setItem(HIGH_SCORE_KEY, String(score));
    }
    setHighScore(nextHighScore);
    return { highScore: nextHighScore, isNewRecord };
  };

  const finishLevel = (finalStatus: ResultSummary['status'], nextLevelScore: number, nextTotalScore: number, timeBonus: number) => {
    const isRunOver = finalStatus !== 'levelWon';
    const record = isRunOver
      ? updateHighScore(nextTotalScore)
      : { highScore: Math.max(highScore, nextTotalScore), isNewRecord: false };

    const message =
      finalStatus === 'gameWon'
        ? '三關全通！大鵝被你穩穩抓住了。'
        : finalStatus === 'levelWon'
          ? '本關通過！整理一下籃子，準備進下一關。'
          : '挑戰失敗！保留節奏，重新挑戰本關就好。';

    setResultSummary({
      status: finalStatus,
      levelTitle: currentLevel.title,
      levelNumber: currentLevel.id,
      levelScore: nextLevelScore,
      totalScore: nextTotalScore,
      highScore: record.highScore,
      isNewRecord: record.isNewRecord,
      timeBonus,
      message
    });
    setStatus(finalStatus);
    setMessage(message);
  };

  const setupLevel = (levelIndex: number, scoreAtStart: number, introPrefix = '') => {
    const level = LEVELS[levelIndex];
    clearPendingTimer();
    setCurrentLevelIndex(levelIndex);
    setBoard(createBoard(level));
    setTray([]);
    setTimeLeft(level.timeLimit);
    setLevelStartScore(scoreAtStart);
    setTotalScore(scoreAtStart);
    setLevelScore(0);
    setCombo(0);
    setClearingType(null);
    setPickedItemId(null);
    setResultSummary(null);
    setStatus('playing');
    setMessage(`${introPrefix}${level.shortTitle}：${level.intro}`);
    play('tool');
  };

  useEffect(() => {
    if (!isPlaying) return;
    if (timeLeft <= 0) {
      play('lose');
      setCombo(0);
      finishLevel('lost', levelScore, totalScore, 0);
      return;
    }

    const timer = window.setTimeout(() => setTimeLeft((time) => time - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [isPlaying, levelScore, play, timeLeft, totalScore]);

  useEffect(() => {
    return () => clearPendingTimer();
  }, []);

  const startGame = () => {
    setupLevel(0, 0);
  };

  const goHome = () => {
    clearPendingTimer();
    setCurrentLevelIndex(0);
    setBoard(createBoard(LEVELS[0]));
    setTray([]);
    setStatus('ready');
    setTimeLeft(LEVELS[0].timeLimit);
    setTotalScore(0);
    setLevelScore(0);
    setLevelStartScore(0);
    setCombo(0);
    setClearingType(null);
    setPickedItemId(null);
    setResultSummary(null);
    setMessage('準備好就開始第 1 關，連續三消可以累積 combo。');
  };

  const retryLevel = () => {
    setupLevel(currentLevelIndex, levelStartScore, '重新挑戰！');
  };

  const nextLevel = () => {
    if (!isFinalLevel) {
      setupLevel(currentLevelIndex + 1, totalScore, '過關啦！');
    }
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
      setCombo(0);
      play('lose');
      finishLevel('lost', levelScore, totalScore, 0);
      return;
    }

    setBoard(nextBoard);
    setTray(nextTrayRaw);

    if (tripleType) {
      const nextCombo = combo + 1;
      const matchScore = comboScore(nextCombo);
      setClearingType(tripleType);
      setMessage(`Combo ${nextCombo}！三個「${item.label}」集合，+${matchScore} 分。`);
      play('match');
      clearTimerRef.current = window.setTimeout(() => {
        const resolvedTray = removeTriple(nextTrayRaw, tripleType);
        const clearedBoard = nextBoard.length === 0 && resolvedTray.length === 0;
        const timeBonus = clearedBoard ? timeLeft : 0;
        const nextLevelScore = levelScore + matchScore + timeBonus;
        const nextTotalScore = totalScore + matchScore + timeBonus;

        setTray(resolvedTray);
        setClearingType(null);
        setCombo(nextCombo);
        setLevelScore(nextLevelScore);
        setTotalScore(nextTotalScore);

        if (clearedBoard) {
          play('win');
          finishLevel(isFinalLevel ? 'gameWon' : 'levelWon', nextLevelScore, nextTotalScore, timeBonus);
          return;
        }

        setMessage(`三消成功！目前 combo ${nextCombo}，下一次連消分數更高。`);
      }, 280);
      return;
    }

    setCombo(0);
    setMessage(`「${item.label}」放進小籃子了；這次沒有三消，combo 重新計算。`);
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
    setCombo(0);
    setMessage('已打亂桌面，combo 重新計算。');
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
    const clearedBoard = nextBoard.length === 0 && tray.length === 0;
    const timeBonus = clearedBoard ? timeLeft : 0;
    const nextLevelScore = clampScore(levelScore - 5 + timeBonus);
    const nextTotalScore = clampScore(totalScore - 5 + timeBonus);

    setBoard(nextBoard);
    setLevelScore(nextLevelScore);
    setTotalScore(nextTotalScore);
    setCombo(0);
    play(clearedBoard ? 'win' : 'tool');

    if (clearedBoard) {
      finishLevel(isFinalLevel ? 'gameWon' : 'levelWon', nextLevelScore, nextTotalScore, timeBonus);
      return;
    }

    setMessage(`已移除一個「${item.label}」，扣 5 分並重置 combo。`);
  };

  return {
    board,
    tray,
    status,
    timeLeft,
    totalScore,
    levelScore,
    levelStartScore,
    combo,
    highScore,
    message,
    currentLevel,
    currentLevelIndex,
    levels: LEVELS,
    isFinalLevel,
    isPlaying,
    clearingType,
    pickedItemId,
    isBusy: Boolean(clearingType),
    resultSummary,
    availableIds,
    startGame,
    retryLevel,
    nextLevel,
    goHome,
    pickItem,
    useHint,
    useShuffle,
    useRemove,
    sound: {
      enabled: soundEnabled,
      volume: soundVolume,
      setVolume: setSoundVolume,
      toggle: toggleSound
    }
  };
};
