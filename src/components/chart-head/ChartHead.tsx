interface ChartHead {
  title: string;
  color?: string;
}

export const ChartHead: React.FC<ChartHead> = ({
  title,
  color = "bg-red-500",
}) => {
  return (
    <div className="bg-[var(--bgcardhead)] flex items-center py-1 gap-2">
      <span className={`inline-block w-[3px] h-[15px] ${color}`}></span>
      <span>{title}</span>
    </div>
  );
};
