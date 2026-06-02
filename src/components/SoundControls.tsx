import { Volume2, VolumeX } from 'lucide-react';

type SoundControlsProps = {
  enabled: boolean;
  volume: number;
  onToggle: () => void;
  onVolumeChange: (volume: number) => void;
};

const SoundControls = ({ enabled, volume, onToggle, onVolumeChange }: SoundControlsProps) => {
  const volumePercent = Math.round(volume * 100);

  return (
    <div className="sound-controls" aria-label="音效設定">
      <button
        type="button"
        className="sound-toggle"
        aria-pressed={enabled}
        aria-label={enabled ? '關閉音效' : '開啟音效'}
        onClick={onToggle}
      >
        {enabled ? <Volume2 size={18} strokeWidth={2.7} /> : <VolumeX size={18} strokeWidth={2.7} />}
        <span>{enabled ? '音效開' : '靜音'}</span>
      </button>
      <label className="sound-volume">
        <span>{volumePercent}%</span>
        <input
          aria-label="音量"
          type="range"
          min="0"
          max="100"
          step="5"
          value={volumePercent}
          onInput={(event) => onVolumeChange(Number(event.currentTarget.value) / 100)}
          onChange={(event) => onVolumeChange(Number(event.currentTarget.value) / 100)}
        />
      </label>
    </div>
  );
};

export default SoundControls;
