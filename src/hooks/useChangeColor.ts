import { useLocalStorage } from "usehooks-ts";

export const useChangeColor = () => {
  const [dark] = useLocalStorage("dark", true);

  const color = dark ? "rgba(3, 18, 37,1)" : "#f1f1f1";

  return color;
};
