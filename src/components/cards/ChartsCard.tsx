import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";
import { ChartHead } from "../chart-head/ChartHead";

import { useEffect, useRef } from "react";
import { useLocalStorage } from "usehooks-ts";
import "./Card.scss";
interface ChartsCardProps {
  option?: echarts.EChartsOption;
  title: string;
  height?: string | number;
}

const defaultOptions: echarts.EChartsOption = {
  tooltip: {},

  xAxis: {
    type: "category",
    data: ["Road1", "Road2", "Road3", "Road4", "Road5"],
    splitLine: {
      show: false,
    },
  },
  yAxis: {
    type: "value",

    splitLine: {
      show: false,
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "15%",
    top: "10%",
    containLabel: true,
  },

  series: [
    {
      data: [3600, 4200, 2250, 1030, 1805],
      type: "bar",
      label: {
        show: true,
        position: "top",
        color: "",
      },
      barWidth: 15,
      color: "#27AC5FFF",
      itemStyle: {
        borderRadius: [20, 20, 0, 0],
      },
      emphasis: {
        focus: "self",
      },
      animationDelay(idx) {
        return +((idx + 1).toString() + "00");
      },
      animationEasing: "bounceOut",
    },
  ],
};

export const ChartsCard: React.FC<ChartsCardProps> = ({
  option,
  title,
  height = "100%",
}) => {
  const chartRef = useRef<ReactEcharts | null>(null);
  const [dark] = useLocalStorage("dark", true);
  const handleWindowResize = () => {
    if (chartRef.current) {
      // Trigger ECharts resize method
      chartRef.current.getEchartsInstance().resize();
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return window.removeEventListener("resize", handleWindowResize);
  }, [chartRef.current]);

  return (
    <div className="card-cell min-h-[260px] w-full">
      <ChartHead title={title} color="bg-green" />
      <ReactEcharts
        theme={dark ? "dark" : ""}
        ref={chartRef}
        echarts={echarts}
        option={{ backgroundColor: "", ...defaultOptions, ...option }}
        className="[&_div]:!w-auto [&_div]:!h-auto"
        style={{ width: "100%", height: height }}
        // onEvents={onEvents}
      />
    </div>
  );
};
