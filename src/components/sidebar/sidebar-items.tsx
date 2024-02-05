import type { MenuProps } from "antd";
import {
  BarChart3,
  Bus,
  BusFront,
  CreditCard,
  LayoutDashboard,
  TrainFrontTunnel,
} from "lucide-react";
import { GiCardPick } from "react-icons/gi";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import UzMap from "../../assets/uz.svg?react";
import { FaRegStar } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi2";
import { FcLineChart } from "react-icons/fc";
import { TFunction } from "i18next";

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

export const sideBarItems = (t: TFunction<"translation", undefined>) => [
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
