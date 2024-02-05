import { Button, Menu } from "antd";
import {
  ChevronFirst,
  ChevronLast,
  MoreVertical
} from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { useAppDispatch } from "../../redux";
import { loginActions } from "../../redux/login.slice";
import { Logo } from "../logo/Logo";
import { sideBarItems } from "./sidebar-items";


const SidebarTest: React.FC = () => {
  const [expanded, setExpanded] = useLocalStorage("expanded", true);
  const [dark] = useLocalStorage("dark", true);
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(loginActions.setToken(null));
  };

  const items = sideBarItems(t);

  return (
    <div
      className={`flex flex-shrink-0 fixed  flex-col left-0 top-0 shadow-sm float-right bottom-0 z-50 bg-[var(--bgsidebar)] transition-all duration-500 w-full ${
        expanded ? "max-w-[290px]" : "max-w-[70px]"
      }`}
    >
      <div className="flex items-center justify-between p-4 pt-5 pb-2 mb-6">
        <Logo open={expanded} dark={dark} />
        <button
          onClick={() => setExpanded((curr) => !curr)}
          className="p-1.5 rounded-lg bg-[var(--buttonsidbar)] hover:bg-gray-400"
        >
          {expanded ? <ChevronFirst /> : <ChevronLast />}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <Menu
          className="w-full transition-all duration-500 bg-transparent"
          defaultSelectedKeys={[
            pathname.substring(1) === "dashboard"
              ? "dashboard/main"
              : pathname.substring(1),
          ]}
          mode="inline"
          theme={dark ? "dark" : "light"}
          inlineCollapsed={!expanded}
          items={items}
        />
      </div>

      <div className="border-t-[0.1px]  border-[var(--sidebarline)] flex  py-4 px-3">
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
                expanded ? "w-52 ml-3" : "w-0 ml-0"
              }
          `}
        >
          <div className="leading-4"></div>
          <MoreVertical size={20} />
        </div>
      </div>
    </div>
  );
};

export default SidebarTest;
