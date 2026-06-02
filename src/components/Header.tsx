import AssetImage from './AssetImage';
import { imageAssets } from '../data/assets';

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
          <AssetImage src={imageAssets.ui.iconTimer} alt="時間圖標" fallback="⏱" className="stat-icon" />
          <span>時間</span>
          <strong>{timeLeft}s</strong>
        </div>
        <div className="stat-card">
          <AssetImage src={imageAssets.ui.iconScore} alt="分數圖標" fallback="★" className="stat-icon" />
          <span>總分</span>
          <strong>{totalScore}</strong>
        </div>
        <div className="stat-card">
          <AssetImage src={imageAssets.ui.iconScore} alt="最高分圖標" fallback="★" className="stat-icon" />
          <span>最高</span>
          <strong>{highScore}</strong>
        </div>
      </div>
    </header>
  );
};

export default Header;
