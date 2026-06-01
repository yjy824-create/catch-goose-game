import { Clock3, Sparkles } from 'lucide-react';

type HeaderProps = {
  timeLeft: number;
  score: number;
};

const Header = ({ timeLeft, score }: HeaderProps) => {
  return (
    <header className="game-header">
      <div>
        <p className="eyebrow">Catch Goose · Farm Puzzle</p>
        <h1>抓大鵝</h1>
      </div>
      <div className="stats">
        <div className="stat-card">
          <Clock3 size={16} strokeWidth={2.6} />
          <span>時間</span>
          <strong>{timeLeft}s</strong>
        </div>
        <div className="stat-card">
          <Sparkles size={16} strokeWidth={2.6} />
          <span>分數</span>
          <strong>{score}</strong>
        </div>
      </div>
    </header>
  );
};

export default Header;
