import { Link } from "react-router-dom";
import LogoWhite from "../../assets/logo-white.svg?react";
import LogoDark from "../../assets/logo.svg?react";

interface LogoProps {
  open: boolean;
  dark:boolean
}

export const Logo: React.FC<LogoProps> = ({ open ,dark}) => {

  return (
    <Link className="" to={"/"}>
      {dark ? (
        <LogoWhite
          className={`overflow-hidden transition-all duration-500 ${
            open ? "" : "w-0 opacity-0 -translate-x-10"
          }`}
          width={90}
          height={40}
        />
      ) : (
        <LogoDark
          className={`overflow-hidden transition-all duration-500 ${
            open ? "" : "w-0 opacity-0 -translate-x-10"
          }`}
          width={90}
          height={40}
        />
      )}
    </Link>
  );
};
