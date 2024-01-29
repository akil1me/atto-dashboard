import { ThemeConfig } from "antd/es/config-provider/context";
import { theme } from "antd";

const lightTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: "#27AE60",
    linkHoverDecoration: "none",
  },
  components: {
    Switch: {
      colorTextQuaternary: "#989494 !important",
    },
  },
};

const darkTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: "#27AE60",
    colorBorder: "rgba(255,255,255,0.5)",
    linkHoverDecoration: "none",
    colorLink: "#ccc",
  },
};

export const antdThemes: Record<"light" | "dark", ThemeConfig> = {
  light: lightTheme,
  dark: darkTheme,
};
