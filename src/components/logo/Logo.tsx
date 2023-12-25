import { Link } from "react-router-dom";
import LogoWhite from "../../assets/logo-white.svg?react";
import LogoDark from "../../assets/logo.svg?react";
import { useContext } from "react";
import { RootLayoutContext } from "../../layout";

interface LogoProps {
  open: boolean;
}

export const Logo: React.FC<LogoProps> = ({ open }) => {
  const { dark } = useContext(RootLayoutContext);

  return (
    <Link className="" to={"/"}>
      {dark ? (
        <LogoWhite
          className={`overflow-hidden transition-all duration-500 ${
            open ? "" : "w-0 opacity-40 -translate-x-10"
          }`}
          width={90}
          height={40}
        />
      ) : (
        <LogoDark
          className={`overflow-hidden transition-all duration-500 ${
            open ? "" : "w-0 opacity-40 -translate-x-10"
          }`}
          width={90}
          height={40}
        />
      )}
    </Link>
  );
};
