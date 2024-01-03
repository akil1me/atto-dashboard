import { Link, useNavigate } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="w-full mt-16 flex justify-center text-2xl items-center text-[var(--clbody)]">
      <div className="flex flex-col items-center gap-5 text-center">
        <img
          className="w-full"
          src="https://www.playground.ru/img/404-animated.gif"
          alt=""
        />
        <span>
          404 <span className="inline-block mx-4">|</span>Page not Found
        </span>
        <GoBack />
      </div>
    </div>
  );
};

export const GoBack = () => {
  const navigate = useNavigate();

  return (
    <Link
      className="inline-flex relative items-center hover:after:w-full after:transition-all after:duration-300 gap-3 after:w-[0] after:h-[1px] after:absolute after:bottom-[-3px] text-sky-400 after:bg-sky-400 "
      to={".."}
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      <i className="fa-sharp fa-solid fa-arrow-left"></i>
      Go back
    </Link>
  );
};
