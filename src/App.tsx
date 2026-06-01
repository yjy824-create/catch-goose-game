import GameBoard from './components/GameBoard';
import Header from './components/Header';
import ResultModal from './components/ResultModal';
import ToolBar from './components/ToolBar';
import Tray from './components/Tray';
import { useGameLogic } from './hooks/useGameLogic';

function App() {
  const game = useGameLogic();

  return (
    <main className="app-shell">
      <Header timeLeft={game.timeLeft} score={game.score} />
      <div className="level-pill">第 1 關 · 初級挑戰</div>
      <div className="message-bar">{game.message}</div>
      <GameBoard
        board={game.board}
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
      <ResultModal status={game.status} message={game.resultMessage} onStart={game.startGame} />
    </main>
  );
}

export default App;
