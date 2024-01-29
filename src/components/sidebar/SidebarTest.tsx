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
import React from "react";
import { FaRegStar } from "react-icons/fa";
import { FcLineChart } from "react-icons/fc";
import { GiCardPick } from "react-icons/gi";
import { HiOutlineUsers } from "react-icons/hi2";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { Link, useLocation } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import UzMap from "../../assets/uz.svg?react";
import { useAppDispatch } from "../../redux";
import { loginActions } from "../../redux/login.slice";
import { Logo } from "../logo/Logo";
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: string,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  to: string = "",
  className?: string
): MenuItem {
  return {
    key,
    icon,
    children,
    to,
    label: children ? label : <Link to={to}>{label}</Link>,
    className,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    "Главная",
    "dashboard/main",
    <LayoutDashboard size={20} strokeWidth={1} />,
    undefined,
    "main"
  ),
  getItem(
    "Проезды",
    "dashboard/trips",
    <Bus size={20} strokeWidth={1} />,
    undefined,
    "trips"
  ),
  getItem(
    "Тариффы",
    "dashboard/tariffs",
    <span className="!text-xl">
      <LiaMoneyCheckAltSolid />
    </span>,
    undefined,
    "tariffs"
  ),
  getItem(
    "Бины",
    "dashboard/bins",
    <CreditCard size={20} strokeWidth={1} />,
    undefined,
    "bins"
  ),
  getItem(
    "Агграгаторы",
    "dashboard/aggreagators",
    <GiCardPick size={20} strokeWidth={1} />,
    undefined,
    "aggreagators"
  ),
  getItem(
    "Регионы",
    "dashboard/regions",
    <UzMap width={25} height={18} />,
    undefined,
    "regions"
  ),
  getItem(
    "Рейтинг",
    "dashboard/ratings",
    <FaRegStar size={18} />,
    undefined,
    "ratings"
  ),
  getItem(
    "Статистика",
    "dashboard/statistics",
    <BarChart3 size={20} strokeWidth={1} />,
    [
      getItem(
        "Метро",
        "dashboard/statistics/metro",
        <span className="!text-xs">
          <TrainFrontTunnel strokeWidth={1} size={20} />
        </span>,
        undefined,
        "statistics/metro"
      ),
      getItem(
        "Автобус",
        "dashboard/statistics/bus",
        <BusFront strokeWidth={1} size={20} />,
        undefined,
        "statistics/bus"
      ),
      getItem(
        "Пользователи",
        "dashboard/statistics/users",
        <HiOutlineUsers strokeWidth={1} size={20} />,
        undefined,
        "statistics/users"
      ),
    ]
  ),
  getItem(
    "Все диаграммы",
    "dashboard/all-charts",
    <FcLineChart strokeWidth={1} size={20} />,
    undefined,
    "all-charts"
  ),
  // getItem("Navigation One", "sub1", <MailOutlined />, [
  //   getItem("Option 5", "5"),
  //   getItem("Option 6", "6"),
  //   getItem("Option 7", "7"),
  //   getItem("Option 8", "8"),
  // ]),

  // getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
  //   getItem("Option 9", "9"),
  //   getItem("Option 10", "10"),

  //   getItem("Submenu", "sub3", null, [
  //     getItem("Option 11", "11"),
  //     getItem("Option 12", "12"),
  //   ]),
  // ]),
];

const SidebarTest: React.FC = () => {
  const [expanded, setExpanded] = useLocalStorage("expanded", true);
  const [dark] = useLocalStorage("dark", true);
  const { pathname } = useLocation();
  console.log(pathname.substring(1));
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
