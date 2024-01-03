import {
  BarChart3,
  Boxes,
  LayoutDashboard,
  Package,
  Repeat,
  UserCircle,
} from "lucide-react";
import { Dispatch, createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Eerth from "../assets/earth.svg?react";
import { Logo, Sidebar, SidebarItem } from "../components";
import StaggeredDropDown from "../components/dropdown/Dropdown";
import "./RootLayout.scss";

const getMode = (): boolean =>
  JSON.parse(localStorage.getItem("light") || "true");

const getExpanded = (): boolean =>
  JSON.parse(localStorage.getItem("expanded") || "false");

export const DashboardContext = createContext<{
  dark: boolean;
  setDark: Dispatch<React.SetStateAction<boolean>>;
  expanded: boolean;
  setExpanded: Dispatch<React.SetStateAction<boolean>>;
}>({
  dark: getMode(),
  setDark: () => {},
  expanded: false,
  setExpanded: () => {},
});

export const DashboardLayout = () => {
  const [dark, setDark] = useState<boolean>(getMode());
  const [expanded, setExpanded] = useState(getExpanded());

  useEffect(() => {
    localStorage.setItem("light", JSON.stringify(dark));
    localStorage.setItem("expanded", JSON.stringify(expanded));
  }, [dark, expanded]);

  return (
    <DashboardContext.Provider value={{ dark, setDark, setExpanded, expanded }}>
      <div className="flex">
        <Sidebar>
          <SidebarItem
            icon={<LayoutDashboard size={20} strokeWidth={1} />}
            text="Dashboard"
            alert
          />

          <SidebarItem
            icon={<BarChart3 size={20} strokeWidth={1} />}
            text="Statistics"
          />
          <SidebarItem
            icon={<UserCircle size={20} strokeWidth={1} />}
            text="Users"
          />
          <SidebarItem
            icon={<Boxes size={20} strokeWidth={1} />}
            text="InVertory"
          />
          <SidebarItem
            icon={<Package size={20} strokeWidth={1} />}
            text="Orders"
          />
          <SidebarItem
            icon={<Repeat size={20} strokeWidth={1} />}
            text="Billings"
          />
        </Sidebar>

        <main
          className={`my-4 transition-all duration-500 w-full relative ${
            expanded ? "ml-[18rem]" : "ml-[4.3rem]"
          }`}
        >
          <div className="text-2xl pb-3 px-4 border-b border-[#1f67677c] flex items-center justify-between w-full sticky backdrop-blur top-0 z-40">
            <div
              className={`flex items-center  transition-all ${
                expanded ? "gap-0" : "gap-4"
              }`}
            >
              <Logo dark={dark} open={!expanded} />
              <h1> Dashboard</h1>
            </div>

            <StaggeredDropDown />
            {/* <div className="flex items-center gap-4">
              <Switch
                value={dark}
                checkedChildren={<i className="fa-solid fa-moon"></i>}
                unCheckedChildren={
                  <i className="fa-solid fa-sun text-yellow-300"></i>
                }
                onChange={(e) => setDark(e)}
                defaultChecked
              />
              <img
                className="w-10 h-10 rounded-full"
                src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
                alt=""
              />
              <div className="font-medium dark:text-white">
                <div>Jese Leos</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  exemple@gmailcom
                </div>
              </div>
            </div> */}
          </div>
          <Eerth className="svg-file absolute object-cover w-full h-full z-[-1] left-0 right-0 top-16 bottom-0 m-auto" />
          <div className="mx-2">
            <Outlet />
          </div>
        </main>
      </div>
    </DashboardContext.Provider>
  );
};
