interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

export const Title: React.FC<TitleProps> = ({ children, className = "" }) => {
  return (
    <h2
      className={`text-[var(--clbody)] text-center font-bold text-3xl ${className}`}
    >
      {children}
    </h2>
  );
};
