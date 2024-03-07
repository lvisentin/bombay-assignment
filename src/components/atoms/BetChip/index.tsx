type BetChipProps = {
  betValue: number;
};

const BetChip = ({ betValue }: BetChipProps) => {
  return (
    <div className="betChip flex items-center justify-center rounded-full bg-slate-200 w-12 h-12 border-4 border-sky-500">
      {betValue}
    </div>
  );
};

export default BetChip;
