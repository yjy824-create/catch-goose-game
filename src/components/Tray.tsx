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
      <div className="tray">
        {slots.map((item, index) => (
          <div
            key={item?.id ?? `slot-${index}`}
            className={`tray-slot ${item?.type === clearingType ? 'clearing' : ''}`}
          >
            {item ? <span title={item.label}>{item.emoji}</span> : <small>{index + 1}</small>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tray;
