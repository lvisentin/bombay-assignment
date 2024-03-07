import { useContext } from "react";
import { GameContext } from "../../../context/GameContext/GameProvider";
import { GameStatus } from "../../../hooks/useGame/useGame";
import { BetOutcome } from "../../../shared/models/BetService.model";

const PlayingMessage = () => {
  const { computerChoice, playerChoice } = useContext(GameContext);

  return (
    <h1 className="text-center text-golden text-3xl">
      <span className="text-white text-4xl font-bold">{computerChoice} </span>
      vs
      <span className="text-white text-4xl font-bold"> {playerChoice}</span>
    </h1>
  );
};

const WinningMessage = () => {
  const { gameResult, playerChoice } = useContext(GameContext);
  return (
    <h1 className="text-center ">
      <span className="text-green-500 font-bold text-3xl uppercase">
        {playerChoice} WON!
      </span>
      <br />
      <span className="text-golden text-2xl uppercase">YOU WIN </span>
      <span className="amount text-white text-2xl">${gameResult?.amount}</span>
    </h1>
  );
};

const LosingMessage = () => {
  const { gameResult } = useContext(GameContext);

  return (
    <h1 className="text-center ">
      <span className="text-red-500 font-bold text-3xl uppercase">COMPUTER WON!</span>
      <br />
      <span className="text-golden text-2xl uppercase">YOU LOSE </span>
      <span className="amount text-white text-2xl">
        ${gameResult?.betAmount}
      </span>
    </h1>
  );
};

const TieMessage = () => {
  return (
    <h1 className="text-center ">
      <span className="text-yellow-500 font-bold text-3xl uppercase">IT'S A TIE!</span>
      <br />
      <span className="text-golden text-2xl uppercase">YOU GET BACK YOUR BET</span>
    </h1>
  );
};

const BetMessage = () => {
  const { gameStatus, gameResult, betMessage } = useContext(GameContext);

  if (gameStatus === GameStatus.IN_PROGRESS) {
    return <PlayingMessage />;
  } else {
    if (gameResult?.result === BetOutcome.WIN) {
      return <WinningMessage />;
    } else if (gameResult?.result === BetOutcome.TIE) {
      return <TieMessage />;
    } else if (gameResult?.result === BetOutcome.LOSS) {
      return <LosingMessage />;
    } else {
      return <h1 className="text-center text-golden text-3xl">{betMessage}</h1>;
    }
  }
};

export default BetMessage;
