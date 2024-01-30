interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

export const Title: React.FC<TitleProps> = ({ children, className = "" }) => {
  return (
    <h1
      className={`text-[var(--clbody)] text-center font-bold text-2xl ${className}`}
    >
      {children}
    </h1>
  );
};
