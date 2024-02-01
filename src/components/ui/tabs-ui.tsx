import { Tabs } from "antd";
import { BusFront, Grid, TrainFrontTunnel } from "lucide-react";
import { useTranslation } from "react-i18next";

export const TabsUI = () => {
  const { t } = useTranslation();

  const tabItems = [
    {
      text: t("tabs.all"),
      icon: (
        <div className="inline-block align-top">
          <Grid />
        </div>
      ),
      value: "all",
    },
    {
      text: t("tabs.metro"),
      icon: (
        <div className="inline-block align-top">
          <TrainFrontTunnel />
        </div>
      ),
      value: "metro",
    },
    {
      text: t("tabs.bus"),
      icon: (
        <div className="inline-block align-top">
          <BusFront />
        </div>
      ),
      value: "bus",
    },
  ];

  return (
    <Tabs
      className="mb-4"
      size="large"
      defaultActiveKey="1"
      type="line"
      items={tabItems.map((item, i) => {
        const id = String(i + 1);
        return {
          key: id,
          label: item.text,

          icon: item.icon,
        };
      })}
    />
  );
};
