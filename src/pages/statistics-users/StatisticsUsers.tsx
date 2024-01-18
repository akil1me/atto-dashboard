import { useContext } from "react";
import { DashboardContext } from "../../layout";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
const data = [
  ["2000-06-05", 116],
  ["2000-06-06", 129],
  ["2000-06-07", 135],
  ["2000-06-08", 86],
  ["2000-06-09", 73],
  ["2000-06-10", 85],
  ["2000-06-11", 73],
  ["2000-06-12", 68],
  ["2000-06-13", 92],
  ["2000-06-14", 130],
  ["2000-06-15", 245],
  ["2000-06-16", 139],
];
const dateList = data.map(function (item) {
  return item[0];
});
const valueList = data.map(function (item) {
  return item[1];
});
const option: echarts.EChartsOption = {
  backgroundColor: "",
  visualMap: [
    {
      show: false,
      type: "continuous",
      seriesIndex: 0,
      min: 0,
      max: 400,
    },
    {
      show: false,
      type: "continuous",
      seriesIndex: 1,
      dimension: 0,
      min: 0,
      max: dateList.length - 1,
    },
  ],
  title: [
    {
      left: "center",
      text: "Registered users count",
      textStyle: {
        fontSize: 30,
      },
    },
  ],
  tooltip: {
    trigger: "axis",
  },

  xAxis: [
    {
      data: dateList,
    },
  ],
  yAxis: [{}],
  grid: {
    top: 100,
    containLabel: true,
  },
  series: [
    {
      type: "line",
      showSymbol: false,
      data: valueList,
      areaStyle: {},
    },
  ],
};

let dataAxis = [2019, 2020, 2021, 2022, 2023, 2024];

let dataYear = [220, 182, 191, 234, 290, 30];
let yMax = 500;
let dataShadow = [];
for (let i = 0; i < dataYear.length; i++) {
  dataShadow.push(yMax);
}
const yearlyOption: echarts.EChartsOption = {
  backgroundColor: "",
  title: {
    text: "Registration users in Yearly",
    left: "center",
  },
  tooltip: {
    show: true,
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  xAxis: {
    data: dataAxis,
    axisLabel: {
      inside: true,
      color: "#fff",
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    z: 10,
  },
  yAxis: {
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: "#999",
    },
  },
  // dataZoom: [
  //   {
  //     type: "inside",
  //   },
  // ],
  visualMap: [
    {
      show: false,
      type: "continuous",
      seriesIndex: 0,
      min: 0,
      max: 400,
    },
    {
      show: false,
      type: "continuous",
      seriesIndex: 1,
      dimension: 0,
      min: 0,
      max: dateList.length - 1,
    },
  ],
  series: [
    {
      type: "bar",
      showBackground: true,
      // itemStyle: {
      //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      //     { offset: 0, color: "#83bff6" },
      //     { offset: 0.5, color: "#188df0" },
      //     { offset: 1, color: "#188df0" },
      //   ]),
      // },
      barMaxWidth: 70,
      // emphasis: {
      //   itemStyle: {
      //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      //       { offset: 0, color: "#2378f7" },
      //       { offset: 0.7, color: "#2378f7" },
      //       { offset: 1, color: "#83bff6" },
      //     ]),
      //   },
      // },
      data: dataYear,
    },
  ],
};

export const StatisticsUsers = () => {
  const { dark } = useContext(DashboardContext);
  return (
    <div className="p-4">
      <ReactEcharts
        theme={dark ? "dark" : ""}
        className="[&_div]:!w-auto [&_div]:!h-auto mb-14"
        style={{ width: "100%", height: "500px" }}
        option={option}
      />
      <ReactEcharts
        theme={dark ? "dark" : ""}
        className="[&_div]:!w-auto [&_div]:!h-auto mb-14"
        style={{ width: "100%", height: "700px" }}
        option={yearlyOption}
      />
    </div>
  );
};
