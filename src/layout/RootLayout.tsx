import { Outlet } from "react-router-dom";
import { Logo } from "../components";
import { useState } from "react";

export const RootLayout = () => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div className="flex">
      <div
        className={`relative h-screen duration-300 ${
          open ? "w-[300px]" : "w-[100px]"
        } py-4 bg-white shadow-xl float-right`}
      >
        <Logo open={open} />
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={`absolute top-[60px] ${
            !open && "rotate-180"
          }   duration-300 -right-[20px] bg-white border px-3 py-2 rounded-full`}
        >
          <i className="fa fa-arrow-right text-blue"></i>
        </button>
      </div>
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};
