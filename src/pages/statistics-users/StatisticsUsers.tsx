import dayjs from "dayjs";
import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";
import { useLocalStorage } from "usehooks-ts";
import { Title } from "../../components";
import "dayjs/locale/ru";
import "dayjs/locale/uz-latn";
import "dayjs/locale/en";
import { useTranslation } from "react-i18next";

const data = [
  ["2000-01-05", 116],
  ["2000-02-06", 129],
  ["2000-03-07", 135],
  ["2000-04-08", 86],
  ["2000-05-09", 73],
  ["2000-06-10", 85],
  ["2000-07-11", 73],
  ["2000-08-12", 68],
  ["2000-09-13", 92],
  ["2000-10-14", 130],
  ["2000-11-15", 245],
  ["2000-12-16", 139],
];

const getOption = (
  dateList: (string | number)[],
  valueList: number[],
  title: string
): echarts.EChartsOption => ({
  backgroundColor: "",
  title: {
    text: title,
    left: "center",
  },
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
      lineStyle: {
        color: "rgba(135, 206, 250, 0.8)",
      },
      animationEasing: "sinusoidalOut",
      smooth: true,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgba(135, 206, 250, 0.8)" }, // Start color (Sky Blue)
          { offset: 1, color: "rgba(135, 206, 250, 0)" }, // End color (Transparent)
        ]),
      },
    },
  ],
});

let dataAxis = [2019, 2020, 2021, 2022, 2023, 2024];

let dataYear = [220, 182, 191, 234, 290, 30].map((data) => data * 1230);
let yMax = 500;
let dataShadow = [];
for (let i = 0; i < dataYear.length; i++) {
  dataShadow.push(yMax);
}
const getYearlyOption = (title: string): echarts.EChartsOption => ({
  backgroundColor: "",
  title: {
    text: title,
    left: "center",
  },
  tooltip: {
    show: true,
    trigger: "axis",
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

  series: [
    {
      type: "bar",
      showBackground: true,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgba(135, 206, 250, 0.8)" }, // Start color (Sky Blue)
          { offset: 0.5, color: "rgba(24, 141, 240, 0.8)" }, // Middle color
          { offset: 1, color: "rgba(24, 141, 240, 0.8)" }, // End color
        ]),
      },
      barMaxWidth: 70,
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(35, 120, 247, 0.8)" }, // Start color (Deep Blue)
            { offset: 0.7, color: "rgba(35, 120, 247, 0.8)" }, // Middle color
            { offset: 1, color: "rgba(135, 206, 250, 0.8)" }, // End color (Sky Blue)
          ]),
        },
      },
      data: dataYear,
    },
  ],
});

export const StatisticsUsers = () => {
  const [dark] = useLocalStorage("dark", true);
  const [lang] = useLocalStorage("lang", "ru");
  const { t } = useTranslation();

  const yearlyOption = getYearlyOption(t("statistics.users.yearly"));

  const newData = data.map(([date, value]) => {
    dayjs.locale(lang === "uz" ? "uz-latn" : lang);
    const monthName = dayjs(date).format("MMMM"); // 'MMMM' gives the full month name
    return [monthName, value];
  });

  const dateList = newData.map(function (item) {
    return item[0];
  });
  const valueList = newData.map(function (item) {
    return +item[1] * 1000;
  });
  const option = getOption(dateList, valueList, t("statistics.users.monthly"));

  return (
    <div className="p-4">
      <Title className="mb-16">{t("statistics.users.title")}</Title>
      <div className="flex gap-10">
        <ReactEcharts
          theme={dark ? "dark" : ""}
          className="[&_div]:!w-auto [&_div]:!h-auto"
          style={{ width: "100%", height: "500px" }}
          option={option}
        />
        <ReactEcharts
          theme={dark ? "dark" : ""}
          className="[&_div]:!w-auto [&_div]:!h-auto"
          style={{ width: "100%", height: "500px" }}
          option={yearlyOption}
        />
      </div>
    </div>
  );
};
