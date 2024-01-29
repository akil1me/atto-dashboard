import { Button } from "antd";
import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { useAppDispatch } from "../../redux";
import { loginActions } from "../../redux/login.slice";
import { Logo } from "../logo/Logo";

interface SidebarProps {
  children: React.ReactNode;
}

interface SidebarItem {
  icon: React.ReactNode;
  text: string;
  alert?: boolean;
}

export function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useLocalStorage("expanded", true);
  const [dark] = useLocalStorage("dark", true);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(loginActions.setToken(null));
  };

  return (
    <aside className="flex-shrink-0 fixed left-0 top-0 bottom-0 z-50 ">
      <nav className="h-full flex flex-col bg-[var(--bgsidebar)] shadow-sm float-right relative">
        {/* <Button
          className="absolute !h-auto -right-7 text-lg top-0 border-none shadow-none"
          icon={<IoMdClose />}
        ></Button> */}

        <div className="p-4 pb-2 flex justify-between items-center mb-6">
          <Logo open={expanded} dark={dark} />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-[var(--buttonsidbar)] hover:bg-gray-400"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <div className="flex-1 h-full  px-3">{children}</div>

        <div className="border-t border-[var(--sidebarline)] flex py-4 px-3">
          <Button
            onClick={handleLogout}
            icon={
              <i className="text-[var(--cardtext)] fa fa-solid fa-right-from-bracket"></i>
            }
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden duration-500 transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              }
          `}
          >
            <div className="leading-4"></div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, alert }: SidebarItem) {
  const [expanded] = useLocalStorage("expanded", true);

  return (
    <NavLink
      to={text.toLowerCase()}
      className={({ isActive }) => {
        return `
        relative flex items-center py-2 px-3 my-1
        duration-500
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          isActive
            ? "bg-gradient-to-tr from-indigo-200 to-[#4df4f4] text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `;
      }}
    >
      {icon}
      <span
        className={`overflow-hidden duration-500 transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </NavLink>
  );
}
