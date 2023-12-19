import { Link } from "react-router-dom";
import LogoText from "../../assets/logo.svg?react";
import LogoIcon from "../../assets/icon.svg?react";

interface LogoProps {
  open: boolean;
}

export const Logo: React.FC<LogoProps> = ({ open }) => {
  return (
    <Link
      className="flex relative overflow-hidden items-center justify-center gap-2"
      to={"/"}
    >
      <LogoIcon
        className={`duration-500 relative z-[2] ${!open && "rotate-[360deg]"}`}
      />
      <LogoText
        className={`duration-300  ${!open && "translate-x-6 w-0 opacity-0"}`}
        width={90}
        height={40}
      />
    </Link>
  );
};
