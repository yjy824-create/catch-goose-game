import AssetImage from './AssetImage';
import type { CSSProperties } from 'react';
import { imageAssets } from '../data/assets';

type CoverPanelProps = {
  highScore: number;
};

const CoverPanel = ({ highScore }: CoverPanelProps) => {
  return (
    <section
      className="cover-panel"
      style={{ '--cover-image': `url("${imageAssets.background.cover}")` } as CSSProperties}
      aria-label="遊戲封面"
    >
      <div className="cover-art">
        <AssetImage src={imageAssets.goose.main} alt="大鵝主視覺" fallback="🪿" className="cover-goose" />
      </div>
      <p className="cover-kicker">三消收納挑戰</p>
      <h2>抓大鵝</h2>
      <div className="cover-score">歷史最高分 {highScore}</div>
      <p className="cover-copy">點上層物品，凑齊 3 個相同小物就清空籃子，一路追到最後一關。</p>
    </section>
  );
};

export default CoverPanel;
