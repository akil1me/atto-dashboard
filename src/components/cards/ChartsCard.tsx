import { ChartHead } from "../chart-head/ChartHead";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";

import "./Card.scss";
interface ChartsCardProps {
  option?: echarts.EChartsOption;
  title: string;
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
    },
  ],
};

export const ChartsCard: React.FC<ChartsCardProps> = ({ option, title }) => {
  return (
    <div className="card-cell min-h-[260px] w-full">
      <ChartHead title={title} color="bg-green" />
      <ReactEcharts
        option={{ ...defaultOptions, ...option }}
        className="[&_div]:!w-auto [&_div]:!h-auto"
        style={{ width: "100%", height: "100%" }}
        // onEvents={onEvents}
      />
    </div>
  );
};
