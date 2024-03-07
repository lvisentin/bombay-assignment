import { UserBet } from "../hooks/useGame/useGame";
import {
  BetOutcome,
  BetResult,
  PlayResult,
  PossibleBets,
} from "../shared/models/BetService.model";

class BetService {
  play(userChoices: UserBet[]): PlayResult {
    let bets: BetResult[] = [];
    const computerChoice = this.computerChoice();

    for (let userChoice of userChoices) {
      if (
        (userChoice.option.key === PossibleBets.PAPER &&
          computerChoice === PossibleBets.ROCK) ||
        (userChoice.option.key === PossibleBets.ROCK &&
          computerChoice === PossibleBets.SCISSORS) ||
        (userChoice.option.key === PossibleBets.SCISSORS &&
          computerChoice === PossibleBets.PAPER)
      ) {
        bets.push({ ...userChoice, result: BetOutcome.WIN });
      } else if (
        (userChoice.option.key === PossibleBets.PAPER &&
          computerChoice === PossibleBets.SCISSORS) ||
        (userChoice.option.key === PossibleBets.ROCK &&
          computerChoice === PossibleBets.PAPER) ||
        (userChoice.option.key === PossibleBets.SCISSORS &&
          computerChoice === PossibleBets.ROCK)
      ) {
        bets.push({ ...userChoice, result: BetOutcome.LOSS });
      } else {
        bets.push({ ...userChoice, result: BetOutcome.TIE });
      }
    }

    const betAmount = userChoices.reduce((acc, val) => {
      return (acc += val.betValue);
    }, 0);

    return {
      computerChoice,
      bets,
      betAmount,
      amount: this.betResultAmount(bets),
    };
  }

  betResultAmount(betResults: BetResult[]): number {
    return betResults.reduce((acc, bet) => {
      if (bet.result === BetOutcome.WIN) {
        if (betResults.length === 1) {
          return (acc += bet.betValue * 14);
        } else {
          return (acc += bet.betValue * 3);
        }
      }

      if (bet.result === BetOutcome.TIE) {
        return (acc += bet.betValue);
      }

      return acc;
    }, 0);
  }

  computerChoice(): PossibleBets {
    const choices = Object.values(PossibleBets);
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }
}

export const betService = new BetService();
