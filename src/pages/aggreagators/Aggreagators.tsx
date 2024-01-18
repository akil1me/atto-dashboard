import { useContext } from "react";
import { EChartsOption } from "echarts";
import { DashboardContext } from "../../layout";
import ReactEcharts from "echarts-for-react";
import { genData } from "./aggregator-data";

const data = genData();
console.log(data);

const pieOpts: EChartsOption = {
  backgroundColor: "",
  title: {
    text: "Aggregators",
    left: "center",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} sum ({d}%)",
  },
  legend: {
    type: "scroll",
    orient: "vertical",
    right: "10%",
    top: 20,
    bottom: 20,
    data: data.legendData,
  },

  series: [
    {
      name: "Aggregator",
      type: "pie",
      animationType: "scale",
      animationEasing: "elasticOut",
      animationDelay(idx) {
        return +((idx + 1).toString() + "0");
      },
      roseType: "radius",
      radius: [35, 230],
      center: ["40%", "50%"],
      data: data.seriesData,
      itemStyle: {
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 7,
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
};

export const Aggreagators = () => {
  const { dark } = useContext(DashboardContext);

  return (
    <div className="p-4">
      <ReactEcharts
        theme={dark ? "dark" : ""}
        className="[&_div]:!w-auto [&_div]:!h-auto mb-14"
        style={{ width: "100%", height: "700px" }}
        option={pieOpts}
      />
    </div>
  );
};
