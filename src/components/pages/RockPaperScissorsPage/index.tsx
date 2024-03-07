import BetMessage from "../../atoms/BetMessage";
import PlayGameButton from "../../atoms/PlayGameButton";
import BetOptions from "../../organisms/BetOptions";
import Header from "../../organisms/Header";

const RockPaperScissorsPage = () => {
  return (
    <>
      <Header />

      <main className="flex flex-col items-center justify-center h-full mt-[30%]">
        <BetMessage />

        <div className="betOptions flex items-center gap-4 my-12">
          <BetOptions />
        </div>

        <PlayGameButton />
      </main>
    </>
  );
};

export default RockPaperScissorsPage;
