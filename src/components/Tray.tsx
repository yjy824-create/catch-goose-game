import AssetImage from './AssetImage';
import type { CSSProperties } from 'react';
import { getItemImage, imageAssets } from '../data/assets';
import { BoardItem, ItemTypeId, TRAY_LIMIT } from '../data/gameConfig';

type TrayProps = {
  tray: BoardItem[];
  clearingType: ItemTypeId | null;
};

const Tray = ({ tray, clearingType }: TrayProps) => {
  const slots = Array.from({ length: TRAY_LIMIT }, (_, index) => tray[index]);

  return (
    <section className="tray-wrap" aria-label="下方收納欄">
      <div className="tray-title">小籃子</div>
      <div className="tray" style={{ '--tray-image': `url("${imageAssets.ui.trayBasket}")` } as CSSProperties}>
        {slots.map((item, index) => (
          <div
            key={item?.id ?? `slot-${index}`}
            className={`tray-slot ${item?.type === clearingType ? 'clearing' : ''}`}
          >
            {item ? (
              <AssetImage src={getItemImage(item.type)} alt={item.label} fallback={item.emoji} />
            ) : (
              <small>{index + 1}</small>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tray;
