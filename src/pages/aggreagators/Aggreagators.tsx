import { useContext, useMemo } from "react";
import { EChartsOption } from "echarts";
import { DashboardContext } from "../../layout";
import ReactEcharts from "echarts-for-react";
import { genData } from "./aggregator-data";
import { useChangeColor } from "../../hooks";
import { Title } from "../../components";

const data = genData();
console.log(data);

export const Aggreagators = () => {
  const { dark } = useContext(DashboardContext);
  const pieColor = useChangeColor();

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
    <div className="p-4 w-full">
      <Title>Диграмма по Аггрегаторам</Title>
      <ReactEcharts
        theme={dark ? "dark" : ""}
        className="[&_div]:!w-auto [&_div]:!h-auto mb-14"
        style={{ width: "100%", height: "700px" }}
        option={pieOpts}
      />
    </div>
  );
};
