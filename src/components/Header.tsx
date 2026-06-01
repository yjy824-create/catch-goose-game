import { Clock3, Sparkles, Trophy } from 'lucide-react';

type HeaderProps = {
  timeLeft: number;
  totalScore: number;
  highScore: number;
};

const Header = ({ timeLeft, totalScore, highScore }: HeaderProps) => {
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
          <span>總分</span>
          <strong>{totalScore}</strong>
        </div>
        <div className="stat-card">
          <Trophy size={16} strokeWidth={2.6} />
          <span>最高</span>
          <strong>{highScore}</strong>
        </div>
      </div>
    </header>
  );
};

export default Header;
