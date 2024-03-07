import { useContext } from "react";
import { GameContext } from "../../../context/GameContext/GameProvider";

const Header = () => {
  const { userBalance, allBetsValue, gameResult } = useContext(GameContext);

  return (
    <header className="w-full flex items-center justify-center bg-black gap-4 py-2">
      <div className="text-golden font-bold">
        BALANCE: <span className="text-white font-normal">{userBalance}</span>
      </div>
      <div className="text-golden font-bold ">
        BET: <span className="text-white font-normal">{allBetsValue}</span>
      </div>
      <div className="text-golden font-bold ">
        WIN:{" "}
        <span className="text-white font-normal">
          {gameResult?.amount || 0}
        </span>
      </div>
    </header>
  );
};

export default Header;
