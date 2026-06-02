import { Home, Play, RotateCcw, StepForward } from 'lucide-react';
import AssetImage from './AssetImage';
import type { CSSProperties, ReactNode } from 'react';
import { imageAssets } from '../data/assets';
import { GameStatus, LevelConfig } from '../data/gameConfig';
import { ResultSummary } from '../hooks/useGameLogic';

type ResultModalProps = {
  status: GameStatus;
  currentLevel: LevelConfig;
  resultSummary: ResultSummary | null;
  onStart: () => void;
  onRetry: () => void;
  onNextLevel: () => void;
  onHome: () => void;
  soundControls: ReactNode;
};

const ResultModal = ({
  status,
  currentLevel,
  resultSummary,
  onStart,
  onRetry,
  onNextLevel,
  onHome,
  soundControls
}: ResultModalProps) => {
  if (status === 'playing') return null;

  const isReady = status === 'ready';
  const isLevelWon = status === 'levelWon';
  const isGameWon = status === 'gameWon';
  const isLost = status === 'lost';
  const title = isReady ? '準備抓大鵝' : isGameWon ? '全部通關！' : isLevelWon ? '本關通過！' : '挑戰失敗';
  const state = isReady ? 'ready' : isGameWon ? 'won' : isLevelWon ? 'won' : 'lost';

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="result-title">
      <div
        className="modal-card"
        data-state={state}
        style={
          {
            '--panel-image': `url("${imageAssets.ui.panelResult}")`,
            '--button-start-image': `url("${imageAssets.ui.buttonStart}")`
          } as CSSProperties
        }
      >
        {(isLevelWon || isGameWon) && <div className="confetti" aria-hidden="true">✦ ✿ ✦</div>}
        <div className="goose-badge">
          <AssetImage
            src={isReady ? imageAssets.goose.main : isLost ? imageAssets.goose.fail : imageAssets.goose.win}
            alt={isReady ? '大鵝主視覺' : isLost ? '失敗大鵝' : '勝利大鵝'}
            fallback="🪿"
          />
        </div>
        <h2 id="result-title">{title}</h2>
        <p>
          {isReady
            ? `${currentLevel.shortTitle}：${currentLevel.title}。點選上層物品，連續三消可以拿到更高 combo 分。`
            : resultSummary?.message}
        </p>

        {resultSummary && (
          <div className="score-grid" aria-label="本局分數">
            <div>
              <span>關卡</span>
              <strong>{resultSummary.levelNumber}</strong>
            </div>
            <div>
              <span>本關</span>
              <strong>{resultSummary.levelScore}</strong>
            </div>
            <div>
              <span>總分</span>
              <strong>{resultSummary.totalScore}</strong>
            </div>
            <div>
              <span>最高</span>
              <strong>{resultSummary.highScore}</strong>
            </div>
          </div>
        )}

        {resultSummary?.timeBonus ? <div className="record-line">時間獎勵 +{resultSummary.timeBonus}</div> : null}
        {resultSummary?.isNewRecord ? <div className="record-line new-record">新紀錄！</div> : null}
        <div className="modal-sound">{soundControls}</div>

        <div className="modal-actions">
          {isReady && (
            <button className="primary" onClick={onStart}>
              <Play size={20} strokeWidth={2.8} />
              <span>開始遊戲</span>
            </button>
          )}
          {isLevelWon && (
            <button className="primary" onClick={onNextLevel}>
              <StepForward size={20} strokeWidth={2.8} />
              <span>下一關</span>
            </button>
          )}
          {(isLost || isGameWon) && (
            <button className="primary" onClick={isLost ? onRetry : onStart}>
              <RotateCcw size={20} strokeWidth={2.8} />
              <span>{isLost ? '再挑戰本關' : '再玩一次'}</span>
            </button>
          )}
          {!isReady && (
            <button className="secondary" onClick={onHome}>
              <Home size={18} strokeWidth={2.6} />
              <span>回到首頁</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
