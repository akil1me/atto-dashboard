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
import { useTranslation } from "react-i18next";
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
    label: <Link to={to}>{label}</Link>,
    className,
  } as MenuItem;
}

const SidebarTest: React.FC = () => {
  const [expanded, setExpanded] = useLocalStorage("expanded", true);
  const [dark] = useLocalStorage("dark", true);
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(loginActions.setToken(null));
  };

  const items: MenuItem[] = [
    getItem(
      t("sidebar.main"),
      "dashboard/main",
      <LayoutDashboard size={20} strokeWidth={1} />,
      undefined,
      "main"
    ),
    getItem(
      t("sidebar.trips"),
      "dashboard/trips",
      <Bus size={20} strokeWidth={1} />,
      undefined,
      "trips"
    ),
    getItem(
      t("sidebar.tariffs"),
      "dashboard/tariffs",
      <span className="!text-xl">
        <LiaMoneyCheckAltSolid />
      </span>,
      undefined,
      "tariffs"
    ),
    getItem(
      t("sidebar.bins"),
      "dashboard/bins",
      <CreditCard size={20} strokeWidth={1} />,
      undefined,
      "bins"
    ),
    getItem(
      t("sidebar.aggregators"),
      "dashboard/aggregators",
      <GiCardPick size={20} strokeWidth={1} />,
      undefined,
      "aggregators"
    ),
    getItem(
      t("sidebar.regions"),
      "dashboard/regions",
      <UzMap width={25} height={18} />,
      undefined,
      "regions"
    ),
    getItem(
      t("sidebar.ratings"),
      "dashboard/ratings",
      <FaRegStar size={18} />,
      undefined,
      "ratings"
    ),
    getItem(
      t("sidebar.statistics"),
      "dashboard/statistics",
      <BarChart3 size={20} strokeWidth={1} />,
      [
        getItem(
          t("sidebar.metro"),
          "dashboard/statistics/metro",
          <span className="!text-xs">
            <TrainFrontTunnel strokeWidth={1} size={20} />
          </span>,
          undefined,
          "statistics/metro"
        ),
        getItem(
          t("sidebar.bus"),
          "dashboard/statistics/bus",
          <BusFront strokeWidth={1} size={20} />,
          undefined,
          "statistics/bus"
        ),
        getItem(
          t("sidebar.users"),
          "dashboard/statistics/users",
          <HiOutlineUsers strokeWidth={1} size={20} />,
          undefined,
          "statistics/users"
        ),
      ]
    ),
    getItem(
      t("sidebar.allDiagrams"),
      "dashboard/all-charts",
      <FcLineChart strokeWidth={1} size={20} />,
      undefined,
      "all-charts"
    ),
  ];

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
