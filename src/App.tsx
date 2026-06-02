import AssetImage from './components/AssetImage';
import CoverPanel from './components/CoverPanel';
import GameBoard from './components/GameBoard';
import Header from './components/Header';
import ResultModal from './components/ResultModal';
import SoundControls from './components/SoundControls';
import ToolBar from './components/ToolBar';
import Tray from './components/Tray';
import { imageAssets } from './data/assets';
import { useGameLogic } from './hooks/useGameLogic';

function App() {
  const game = useGameLogic();

  return (
    <main className="app-shell">
      <Header timeLeft={game.timeLeft} totalScore={game.totalScore} highScore={game.highScore} />
      <SoundControls
        enabled={game.sound.enabled}
        volume={game.sound.volume}
        onToggle={game.sound.toggle}
        onVolumeChange={game.sound.setVolume}
      />
      {game.status === 'ready' && <CoverPanel highScore={game.highScore} />}
      <div className="level-pill">
        {game.currentLevel.shortTitle} · {game.currentLevel.title} · {game.currentLevel.difficulty}
      </div>
      <div className="run-strip" aria-label="遊戲進度">
        <span>
          <AssetImage src={imageAssets.ui.iconScore} alt="本關分數圖標" fallback="★" className="run-icon" />
          本關 {game.levelScore}
        </span>
        <span>
          <AssetImage src={imageAssets.ui.iconCombo} alt="連擊圖標" fallback="⚡" className="run-icon" />
          Combo {game.combo}
        </span>
        <span>
          {game.currentLevelIndex + 1}/{game.levels.length}
        </span>
      </div>
      <div className="message-bar">{game.message}</div>
      <GameBoard
        board={game.board}
        levelId={game.currentLevel.id}
        availableIds={game.availableIds}
        pickedItemId={game.pickedItemId}
        onPick={game.pickItem}
      />
      <Tray tray={game.tray} clearingType={game.clearingType} />
      <ToolBar
        disabled={!game.isPlaying || game.isBusy}
        onHint={game.useHint}
        onShuffle={game.useShuffle}
        onRemove={game.useRemove}
      />
      <ResultModal
        status={game.status}
        currentLevel={game.currentLevel}
        resultSummary={game.resultSummary}
        onStart={game.startGame}
        onRetry={game.retryLevel}
        onNextLevel={game.nextLevel}
        onHome={game.goHome}
        soundControls={
          <SoundControls
            enabled={game.sound.enabled}
            volume={game.sound.volume}
            onToggle={game.sound.toggle}
            onVolumeChange={game.sound.setVolume}
          />
        }
      />
    </main>
  );
}

export default App;
