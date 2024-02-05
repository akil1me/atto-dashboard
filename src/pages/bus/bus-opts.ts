import { EChartsOption } from "echarts";
import { busData } from "../../json";

export const dataChanger = (val: "amount" | "count") => {
  return busData.bus.children.map((item) => {
    return {
      name: item.name,
      children: item.children.map((child) => {
        return {
          name: child.name,
          children: child.children.map((child2) => {
            return {
              name: child2.name,
              value: val === "amount" ? child2.paidAmount : child2.paidCount,
            };
          }),
        };
      }),
    };
  });
};

export const getBarOpts = (segment: "count" | "amount") => {
  return {
    backgroundColor: "transparent",
    tooltip: {
      show: true,
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },

    xAxis: [
      {
        type: "value",
        show: true,
      },
    ],
    yAxis: [
      {
        type: "category",
        show: true,
        axisLabel: {
          show: true,
          fontSize: 11,
        },
        axisTick: { show: false },

        data: busData.bus.children.map((item) => item.name),
      },
    ],

    universalTransition: true,

    series: [
      {
        id: "treebar",
        type: "bar",
        name: busData.bus.children.map((item) => item.name),
        showBackground: true,

        data: busData.bus.children.map((item) =>
          segment === "count" ? item.paidCount : item.paidAmount
        ),
        universalTransition: true,
        animationDelay: function (idx) {
          return idx * 10;
        },
        animationDelayUpdate: function (idx) {
          return idx * 5;
        },
        itemStyle: {
          borderRadius: [0, 20, 20, 0],
        },
      },
    ],
    animationEasing: "elasticOut",

    animationDelayUpdate: function (idx) {
      return idx * 5;
    },
  } as EChartsOption;
};

export const getTreeOpts = (segment: "count" | "amount", treeColor: string) => {
  return {
    backgroundColor: "transparent",

    tooltip: {},
    legend: {
      show: true,
      data: ["232", "23432"],
      selectedMode: "single",
      top: 55,
      itemGap: 5,
      borderRadius: 5,
    },
    universalTransition: true,
    series: [
      {
        name: "Автобус",
        id: "treebar",
        type: "treemap",
        roam: false,
        zoomToNodeRatio: 1.2,
        zoom: 10,
        data: dataChanger(segment),
        universalTransition: true,
        leafDepth: 1,
        levels: [
          {
            itemStyle: {
              borderColor: treeColor,
              borderWidth: 2,
              gapWidth: 2,
            },
          },
          {
            colorSaturation: [0.3, 0.6],
            itemStyle: {
              borderColorSaturation: 0.7,
              gapWidth: 2,

              borderWidth: 2,
            },
          },
          {
            colorSaturation: [0.3, 0.5],
            itemStyle: {
              borderColorSaturation: 0.6,

              gapWidth: 1,
            },
          },
          {
            colorSaturation: [0.3, 0.5],
          },
        ],
      },
    ],
  };
};
