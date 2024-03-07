import { useContext } from "react";
import { GameContext } from "../../../context/GameContext/GameProvider";
import { GameStatus } from "../../../hooks/useGame/useGame";

const PlayGameButton = () => {
  const { gameStatus, playGame } = useContext(GameContext);

  return (
    <button
      disabled={gameStatus === GameStatus.IN_PROGRESS}
      className="bg-black text-golden border-golden border-2 rounded-full h-16 w-36 uppercase font-bold"
      onClick={playGame}
    >
      {gameStatus === GameStatus.BETTING && "Play"}
      {gameStatus === GameStatus.IN_PROGRESS && "Playing..."}
      {gameStatus === GameStatus.FINISHED && "Clear"}
    </button>
  );
};

export default PlayGameButton;
