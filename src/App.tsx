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
      <div className="message-bar">{game.message}</div>
      <GameBoard board={game.board} availableIds={game.availableIds} onPick={game.pickItem} />
      <Tray tray={game.tray} />
      <ToolBar
        disabled={!game.isPlaying}
        onHint={game.useHint}
        onShuffle={game.useShuffle}
        onRemove={game.useRemove}
      />
      <ResultModal status={game.status} message={game.resultMessage} onStart={game.startGame} />
    </main>
  );
}

export default App;
