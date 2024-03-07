import RockPaperScissorsPage from "./components/pages/RockPaperScissorsPage";
import GameProvider from "./context/GameContext/GameProvider";

function App() {
  return (
    <GameProvider>
      <RockPaperScissorsPage />
    </GameProvider>
  );
}

export default App;
