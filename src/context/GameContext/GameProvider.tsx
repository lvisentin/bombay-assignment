import { createContext } from "react";
import useGame, { GameStatus } from "../../hooks/useGame/useGame";
import { GameResult } from "../../shared/models/BetService.model";

type GameContext = {
  gameStatus: GameStatus;
  bets: any[];
  betOptions: any[];
  allBetsValue: number;
  userBalance: number;
  placeBet: (bet: any) => void;
  playGame: () => void;
  defaultBetValue: number;
  betMessage: string;
  gameResult?: GameResult;
  computerChoice?: string;
  playerChoice?: string;
};

export const GameContext = createContext<GameContext>({} as GameContext);

type GameProviderProps = {
  children: React.ReactNode;
};

const GameProvider = ({ children }: GameProviderProps) => {
  const game = useGame();

  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
};

export default GameProvider;
