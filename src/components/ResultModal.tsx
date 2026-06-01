import { Play, RotateCcw } from 'lucide-react';
import { GameStatus } from '../hooks/useGameLogic';

type ResultModalProps = {
  status: GameStatus;
  message: string;
  onStart: () => void;
};

const ResultModal = ({ status, message, onStart }: ResultModalProps) => {
  if (status === 'playing') return null;

  const isReady = status === 'ready';
  const title = isReady ? '準備抓大鵝' : status === 'won' ? '抓到大鵝！' : '挑戰失敗';
  const ButtonIcon = isReady ? Play : RotateCcw;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="result-title">
      <div className="modal-card" data-state={status}>
        {status === 'won' && <div className="confetti" aria-hidden="true">✦ ✿ ✦</div>}
        <div className="goose-badge">🪿</div>
        <h2 id="result-title">{title}</h2>
        <p>{message}</p>
        <button className="primary" onClick={onStart}>
          <ButtonIcon size={20} strokeWidth={2.8} />
          <span>{isReady ? '開始遊戲' : '再玩一次'}</span>
        </button>
      </div>
    </div>
  );
};

export default ResultModal;
