import { Switch } from "antd";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { Logo } from "../components";
import StaggeredDropDown from "../components/dropdown/Dropdown";
import SidebarTest from "../components/sidebar/SidebarTest";
import "./RootLayout.scss";

export const DashboardLayout = () => {
  const [dark, setDark] = useLocalStorage("dark", true);

  const [expanded, setExpanded] = useLocalStorage("expanded", true);
  // const [] =st

  useEffect(() => {
    if (!dark) {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, [dark]);

  return (
    <div className="flex">
      <SidebarTest />

      <main
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

            <div>Dashboard</div>
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
        </div>
        <div className="mx-2">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
