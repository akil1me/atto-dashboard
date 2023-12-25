interface ChartHead {
  title: string;
}

export const ChartHead: React.FC<ChartHead> = ({ title }) => {
  return <div className="bg-[var(--bgcardhead)] py-1 px-3">{title}</div>;
};
