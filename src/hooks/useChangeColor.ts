import { useContext } from "react";
import { DashboardContext } from "../layout";

export const useChangeColor = () => {
  const { dark } = useContext(DashboardContext);

  const color = dark ? "rgba(3, 18, 37,1)" : "#f1f1f1";

  return color;
};
