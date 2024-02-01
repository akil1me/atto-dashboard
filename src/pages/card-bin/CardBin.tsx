import { EChartsOption } from "echarts";
import ReactEcharts from "echarts-for-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "usehooks-ts";
import { Title } from "../../components";
import { SegmentedCount } from "../../components/ui/segmented-count";
import { TabsUI } from "../../components/ui/tabs-ui";

export const CardBin = () => {
  const [dark] = useLocalStorage("dark", true);
  const { t } = useTranslation();
  const [segment, setSegment] = useState<"count" | "amount">("count");

  return (
    <div className="w-full px-4 py-4">
      <Title>{t("bin.title")}</Title>
      <div className="flex items-center justify-between">
        <TabsUI />
        <SegmentedCount setSegment={setSegment} />
      </div>

      <ReactEcharts
        theme={dark ? "dark" : ""}
        className="[&_div]:!w-auto [&_div]:!h-auto mb-14"
        style={{ width: "100%", height: "700px" }}
        option={
          {
            backgroundColor: "transparent",
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow",
              },
            },
            legend: {},
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true,
            },
            xAxis: [
              {
                type: "value",
              },
            ],
            yAxis: [
              {
                type: "category",
                axisTick: {
                  show: false,
                },
                data: [
                  "Humo",
                  "Mastercard",
                  "UnionPay",
                  "UnionPay Kobeyd",
                  "Uzcard",
                  "Visa",
                  "Visa Humans",
                ],
              },
            ],
            series: [
              {
                name: t("bin.paid"),
                type: "bar",
                stack: "Total",
                label: {
                  show: true,
                  formatter: segment === "amount" ? "{c} sum" : "{c}",
                },
                emphasis: {
                  focus: "series",
                },
                data: [10040, 757, 1823, 2680, 1792, 5702, 420].map((item) => {
                  if (segment === "amount") {
                    return item * 1700;
                  }
                  return item;
                }),
                barWidth: 50,
                itemStyle: {
                  color: "#27AE60FF",
                },
                animationDelay(idx) {
                  return +((idx + 1).toString() + "00");
                },
                animationEasing: "elasticOut",
                animationEasingUpdate: "elasticOut",
              },
              {
                name: t("bin.notPaid"),
                type: "bar",
                stack: "Total",
                label: {
                  show: true,
                  position: "outside",
                  formatter: segment === "amount" ? "{c} sum" : "{c}",
                },
                emphasis: {
                  focus: "series",
                },
                animationEasing: "elasticOut",
                animationEasingUpdate: "elasticOut",
                animationDelay(idx) {
                  return +((idx + 1).toString() + "00");
                },
                barWidth: 50,
                itemStyle: {
                  color: "#EE6666FF",
                },

                data: [-428, -50, -100, -124, -11, -85, -210].map((item) => {
                  if (segment === "amount") {
                    return item * 1700;
                  }
                  return item;
                }),
              },
            ],
          } as EChartsOption
        }
      />
    </div>
  );
};
