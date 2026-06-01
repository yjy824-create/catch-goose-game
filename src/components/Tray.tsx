import { BoardItem, TRAY_LIMIT } from '../data/gameConfig';

type TrayProps = {
  tray: BoardItem[];
};

const Tray = ({ tray }: TrayProps) => {
  const slots = Array.from({ length: TRAY_LIMIT }, (_, index) => tray[index]);

  return (
    <section className="tray" aria-label="下方收納欄">
      {slots.map((item, index) => (
        <div key={item?.id ?? `slot-${index}`} className="tray-slot">
          {item ? <span title={item.label}>{item.emoji}</span> : <small>{index + 1}</small>}
        </div>
      ))}
    </section>
  );
};

export default Tray;
