import { Lightbulb, Shuffle, Wand2 } from 'lucide-react';

type ToolBarProps = {
  disabled: boolean;
  onHint: () => void;
  onShuffle: () => void;
  onRemove: () => void;
};

const ToolBar = ({ disabled, onHint, onShuffle, onRemove }: ToolBarProps) => {
  return (
    <div className="toolbar" aria-label="道具列">
      <button onClick={onHint} disabled={disabled} title="提示目前建議點選的物品">
        <Lightbulb size={19} strokeWidth={2.6} />
        <span>提示</span>
      </button>
      <button onClick={onShuffle} disabled={disabled} title="重新排列桌面物品，combo 重新計算">
        <Shuffle size={19} strokeWidth={2.6} />
        <span>打亂</span>
      </button>
      <button onClick={onRemove} disabled={disabled} title="移除一個可點選物品，扣 5 分">
        <Wand2 size={19} strokeWidth={2.6} />
        <span>移除</span>
      </button>
    </div>
  );
};

export default ToolBar;
