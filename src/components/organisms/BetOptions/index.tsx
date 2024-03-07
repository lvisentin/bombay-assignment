import { useContext } from "react";
import { GameContext } from "../../../context/GameContext/GameProvider";
import { BetOption, GameStatus, UserBet } from "../../../hooks/useGame/useGame";
import BetCard from "../../molecules/BetCard";

const BetOptions = () => {
  const { bets, betOptions, gameStatus, placeBet, defaultBetValue } =
    useContext(GameContext);

  return betOptions.map((option: BetOption, index: number) => (
    <BetCard
      disabled={gameStatus !== GameStatus.BETTING}
      key={index}
      label={option.label}
      betValue={
        bets.find((bet: UserBet) => bet.option.key === option.key)?.betValue ||
        0
      }
      boxColor={option.boxColor}
      textColor={option.textColor}
      onClick={() => placeBet({ option, betValue: defaultBetValue })}
    />
  ));
};

export default BetOptions;
