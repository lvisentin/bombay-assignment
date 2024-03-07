import { useState } from "react";
import { betService } from "../../services/BetService";
import {
  BetOutcome,
  BetResult,
  GameResult,
  PossibleBets,
} from "../../shared/models/BetService.model";

export enum GameStatus {
  BETTING = "betting",
  FINISHED = "finished",
  IN_PROGRESS = "in_progress",
}

export type UserBet = {
  betValue: number;
  option: BetOption;
};

export type BetOption = {
  label: string;
  boxColor: string;
  textColor: string;
  key: PossibleBets;
};

const useGame = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.BETTING);
  const [bets, setBets] = useState<UserBet[]>([]);
  const [allBetsValue, setAllBetsValue] = useState<number>(0);
  const [userBalance, setUserBalance] = useState<number>(5000);
  const [betMessage, setBetMessage] = useState<string>("PICK YOUR POSITIONS");
  const [computerChoice, setComputerChoice] = useState<string>("rock");
  const [playerChoice, setPlayerChoice] = useState<string>("paper");
  const [gameResult, setGameResult] = useState<GameResult>();

  const defaultBetValue = 500;
  const betOptions: BetOption[] = [
    {
      label: "rock",
      boxColor: "#211F4F",
      textColor: "#2680EA",
      key: PossibleBets.ROCK,
    },
    {
      label: "paper",
      boxColor: "#1A381D",
      textColor: "#16C058",
      key: PossibleBets.PAPER,
    },
    {
      label: "scissors",
      boxColor: "#50091E",
      textColor: "#E31542",
      key: PossibleBets.SCISSORS,
    },
  ];

  const placeBet = ({ betValue, option }: UserBet): void => {
    if (userBalance < betValue) {
      setBetMessage("YOU HAVE NO BALANCE");
      return;
    }

    const doneBets = bets.filter((opt) => opt.betValue > 0);
    if (
      doneBets.length > 1 &&
      !doneBets.some((done) => done.option.key === option.key)
    ) {
      return;
    }

    let newBets = [];
    if (bets.length === 0) {
      newBets = [{ betValue, option }];
    } else {
      newBets = bets.map((bet) => {
        if (bet.option.key === option.key) {
          return { ...bet, betValue: bet.betValue + betValue };
        }
        return bet;
      });
    }

    if (!newBets.some((bet) => bet.option.key === option.key)) {
      newBets.push({ betValue, option });
    }

    const totalBets = newBets.reduce((acc, val) => {
      return (acc += val.betValue);
    }, 0);

    setUserBalance((prev) => (prev -= betValue));
    setAllBetsValue(totalBets);
    setBets(newBets);
  };

  const clearBets = () => {
    setBets([]);
    setAllBetsValue(0);
  };

  const resetGame = () => {
    setGameStatus(GameStatus.BETTING);
    setGameResult(undefined);
    clearBets();
    setBetMessage("PICK YOUR POSITIONS");
  };

  const playGame = () => {
    if (gameStatus === GameStatus.FINISHED) {
      resetGame();
      return;
    }

    if (userBalance < defaultBetValue) {
      setBetMessage("YOU HAVE NO BALANCE");
      return;
    }

    if (bets.length === 0) {
      setBetMessage("PLEASE MAKE A BET");
      return;
    }

    setBetMessage("");
    setGameStatus(GameStatus.IN_PROGRESS);

    const match = betService.play(bets);

    setPlayerChoice(match.bets[0].option.label);
    setComputerChoice(computerChoice);
    setUserBalance((prev) => (prev += match.amount));

    setTimeout(() => {
      setGameStatus(GameStatus.FINISHED);
      const winnerBet = match?.bets.filter(
        (bet: BetResult) => bet.result === BetOutcome.WIN,
      );
      const gameTie = match?.bets.filter(
        (bet: BetResult) => bet.result === BetOutcome.TIE,
      );

      if (winnerBet.length) {
        setGameResult({
          amount: match.amount,
          betAmount: match.betAmount,
          result: BetOutcome.WIN,
        });
      } else if (gameTie.length) {
        setGameResult({
          amount: match.amount,
          betAmount: match.betAmount,
          result: BetOutcome.TIE,
        });
      } else {
        setGameResult({
          amount: match.amount,
          betAmount: match.betAmount,
          result: BetOutcome.LOSS,
        });
      }

      clearBets();
    }, 1000);
  };

  return {
    gameStatus,
    bets,
    allBetsValue,
    betOptions,
    userBalance,
    defaultBetValue,
    placeBet,
    playGame,
    betMessage,
    gameResult,
    computerChoice,
    playerChoice,
  };
};
export default useGame;
