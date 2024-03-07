import { UserBet } from "../../hooks/useGame/useGame";

export enum PossibleBets {
  ROCK = "rock",
  PAPER = "paper",
  SCISSORS = "scissors",
}

export enum BetOutcome {
  WIN = "win",
  LOSS = "loss",
  TIE = "tie",
}

export interface BetResult extends UserBet {
  result: BetOutcome;
}

export type PlayResult = {
  computerChoice: PossibleBets;
  betAmount: number;
  amount: number;
  bets: BetResult[];
};

export type GameResult = {
  amount: number;
  result: BetOutcome;
  betAmount: number;
};
