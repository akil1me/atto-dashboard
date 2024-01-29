import { Switch } from "antd";
import { Dispatch, createContext, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { Logo } from "../components";
import StaggeredDropDown from "../components/dropdown/Dropdown";
import SidebarTest from "../components/sidebar/SidebarTest";
import "./RootLayout.scss";
import { useLocalStorage } from "usehooks-ts";

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
  const [dark, setDark] = useLocalStorage("dark", true);

  const [expanded, setExpanded] = useState(getExpanded());
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    localStorage.setItem("light", JSON.stringify(dark));
    localStorage.setItem("expanded", JSON.stringify(expanded));
  }, [dark, expanded]);

  useEffect(() => {
    if (!dark) {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, [dark]);

  useEffect(() => {
    if (mainRef.current) {
      console.log(mainRef.current.clientWidth);
    }
  }, [expanded]);

  return (
    <DashboardContext.Provider value={{ dark, setDark, setExpanded, expanded }}>
      <div className="flex">
        <SidebarTest />
        {/* <Sidebar>
          <SidebarItem
            icon={<LayoutDashboard size={20} strokeWidth={1} />}
            text="Main"
            alert
          />
          <SidebarItem icon={<Bus size={20} strokeWidth={1} />} text="Trips" />

          <SidebarItem
            icon={
              <span className="text-xl">
                <LiaMoneyCheckAltSolid />
              </span>
            }
            text="Tariffs"
          />
          <SidebarItem
            icon={<CreditCard size={20} strokeWidth={1} />}
            text="Bins"
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
        </Sidebar> */}

        <main
          ref={mainRef}
          className={`mt-1 mb-4 transition-all duration-500 w-full relative ${
            expanded ? "ml-[18rem]" : "ml-[4.3rem]"
          }`}
        >
          <div className="text-2xl pb-2 px-4  flex items-center justify-between w-full sticky backdrop-blur top-0 z-40">
            <div
              className={`flex items-center  transition-all ${
                expanded ? "gap-0" : "gap-4"
              }`}
            >
              <Logo dark={dark} open={!expanded} />
            </div>

            <div className="flex items-center gap-3">
              <Switch
                size="small"
                value={dark}
                checkedChildren={<i className="fa-solid fa-moon"></i>}
                unCheckedChildren={
                  <i className="fa-solid fa-sun text-yellow-300"></i>
                }
                onChange={(e) => setDark(e)}
                defaultChecked
              />
              <StaggeredDropDown />
            </div>
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
          <div className="mx-2">
            <Outlet />
          </div>
        </main>
      </div>
    </DashboardContext.Provider>
  );
};
