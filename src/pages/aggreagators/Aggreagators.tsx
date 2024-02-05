import { EChartsOption } from "echarts";
import ReactEcharts from "echarts-for-react";
import { useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Title } from "../../components";
import { useChangeColor } from "../../hooks";
import { genData } from "./aggregator-data";
import { useTranslation } from "react-i18next";

const data = genData();
console.log(data);

export const Aggreagators = () => {
  const [dark] = useLocalStorage("dark", true);
  const pieColor = useChangeColor();
  const { t } = useTranslation();

  const pieOpts: EChartsOption = useMemo(
    () => ({
      backgroundColor: "",

      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} sum ({d}%)",
      },
      legend: {
        type: "scroll",
        orient: "vertical",
        right: 10,
        top: 20,
        bottom: 20,
        data: data.legendData,
      },

      series: [
        {
          name: "Aggregator",
          type: "pie",
          selectedMode: "single",
          animationType: "scale",
          animationEasing: "exponentialOut",
          animationDuration: 500,
          animationDelay(idx) {
            return +((idx + 1).toString() + "0");
          },

          // roseType: "area",
          radius: [50, 220],
          labelLine: {
            smooth: true,
          },
          center: ["40%", "50%"],
          data: data.seriesData,
          itemStyle: {
            borderWidth: 2,
            borderColor: pieColor,
            borderRadius: 8,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    }),
    [pieColor]
  );

  return (
    <div className="w-full p-4">
      <Title>{t("aggregators.title")}</Title>
      <ReactEcharts
        theme={dark ? "dark" : ""}
        className="[&_div]:!w-auto [&_div]:!h-auto mb-14"
        style={{ width: "100%", height: "700px" }}
        option={pieOpts}
      />
    </div>
  );
};
