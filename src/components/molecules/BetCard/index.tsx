import BetChip from "../../atoms/BetChip";

type BetCardProps = {
  label: string;
  boxColor: string;
  textColor: string;
  betValue: number;
  onClick: () => void;
  disabled: boolean;
};

const BetCard = ({
  label,
  boxColor,
  textColor,
  betValue,
  onClick,
  disabled,
}: BetCardProps) => {
  return (
    <button
      disabled={disabled}
      style={{ backgroundColor: boxColor, border: `2px solid ${textColor}` }}
      onClick={onClick}
      className="w-36 h-32 flex flex-col items-center justify-end pb-6 gap-2 rounded-md"
    >
      {betValue > 0 ? <BetChip betValue={betValue} /> : undefined}
      <span className="uppercase font-bold" style={{ color: textColor }}>
        {label}
      </span>
    </button>
  );
};

export default BetCard;
