import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import {
  BarChart3,
  Bus,
  BusFront,
  ChevronFirst,
  ChevronLast,
  CreditCard,
  LayoutDashboard,
  MoreVertical,
  TrainFrontTunnel,
} from "lucide-react";
import React, { useContext } from "react";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { Link, useLocation } from "react-router-dom";
import { DashboardContext } from "../../layout";
import { useAppDispatch } from "../../redux";
import { loginActions } from "../../redux/login.slice";
import { Logo } from "../logo/Logo";
import { GiCardPick } from "react-icons/gi";
import { HiOutlineUsers } from "react-icons/hi2";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: string,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  to?: string,
  className?: string
): MenuItem {
  return {
    key,
    icon,
    children,
    label: children ? (
      label
    ) : (
      <Link to={to ? to : label.toLocaleLowerCase()}>{label}</Link>
    ),
    className,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    "Main",
    "dashboard/main",
    <LayoutDashboard size={20} strokeWidth={1} />
  ),
  getItem("Trips", "dashboard/trips", <Bus size={20} strokeWidth={1} />),
  getItem(
    "Tariffs",
    "dashboard/tariffs",
    <span className="!text-xl">
      <LiaMoneyCheckAltSolid />
    </span>
  ),
  getItem("Bins", "dashboard/bins", <CreditCard size={20} strokeWidth={1} />),
  getItem(
    "Aggreagators",
    "dashboard/aggreagators",
    <GiCardPick size={20} strokeWidth={1} />
  ),

  getItem(
    "Statistics",
    "dashboard/statistics",
    <BarChart3 size={20} strokeWidth={1} />,
    [
      getItem(
        "Metro",
        "dashboard/statistics/metro",
        <span className="!text-xs">
          <TrainFrontTunnel strokeWidth={1} size={20} />
        </span>,
        undefined,
        "statistics/metro"
      ),
      getItem(
        "Bus",
        "dashboard/statistics/bus",
        <BusFront strokeWidth={1} size={20} />,
        undefined,
        "statistics/bus"
      ),
      getItem(
        "Users",
        "dashboard/statistics/users",
        <HiOutlineUsers strokeWidth={1} size={20} />,
        undefined,
        "statistics/users"
      ),
    ]
  ),
  getItem("Navigation One", "sub1", <MailOutlined />, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Option 7", "7"),
    getItem("Option 8", "8"),
  ]),

  getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),

    getItem("Submenu", "sub3", null, [
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),
  ]),
];

const SidebarTest: React.FC = () => {
  const { dark, expanded, setExpanded } = useContext(DashboardContext);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(loginActions.setToken(null));
  };

  return (
    <div
      className={`flex-shrink-0 fixed flex flex-col left-0 top-0 shadow-sm float-right  bottom-0 z-50 bg-[var(--bgsidebar)] transition-all duration-500 w-full ${
        expanded ? "max-w-[290px]" : "max-w-[70px]"
      }`}
    >
      <div className="p-4 pb-2  pt-5 flex justify-between items-center mb-6">
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
          className="bg-transparent w-full transition-all duration-500"
          defaultSelectedKeys={[pathname.substring(1)]}
          mode="inline"
          theme={dark ? "dark" : "light"}
          inlineCollapsed={!expanded}
          items={items}
        />
      </div>

      <div className="border-t-[0.1px]  border-[var(--sidebarline)] flex py-4 px-3">
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
    </div>
  );
};

export default SidebarTest;
