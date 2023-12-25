import { Switch } from "antd";
import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "..";
import { RootLayoutContext } from "../../layout";

const SidebarContext = createContext<{ expanded: boolean }>({ expanded: true });

interface SidebarProps {
  children: React.ReactNode;
}

interface SidebarItem {
  icon: React.ReactNode;
  text: string;
  alert?: boolean;
}

export function Sidebar({ children }: SidebarProps) {
  const { dark, setDark } = useContext(RootLayoutContext);

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [dark]);

  const [expanded, setExpanded] = useState(false);

  return (
    <aside className="flex-shrink-0 sticky h-screen  top-0 bottom-0 z-10 ">
      <nav className="h-full flex flex-col bg-[var(--bgsidebar)] shadow-sm float-right">
        <div className="p-4 pb-2 flex justify-between items-center mb-6">
          <Logo open={expanded} />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-[var(--buttonsidbar)] hover:bg-gray-400"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <div className="flex-1 h-full  px-3">{children}</div>
        </SidebarContext.Provider>

        <div className="border-t border-[var(--sidebarline)] flex py-4 px-3">
          <Switch
            value={dark}
            checkedChildren={<i className="fa-solid fa-moon"></i>}
            unCheckedChildren={
              <i className="fa-solid fa-sun text-yellow-300"></i>
            }
            onChange={(e) => setDark(e)}
            defaultChecked
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
  const { expanded } = useContext(SidebarContext);

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
            ? "bg-gradient-to-tr from-indigo-200 to-[#51FFFEFF] text-indigo-800"
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
