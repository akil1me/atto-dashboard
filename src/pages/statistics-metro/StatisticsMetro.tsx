import { Segmented } from "antd";
import { SegmentedValue } from "antd/es/segmented";
import { EChartsOption } from "echarts";
import ReactEcharts from "echarts-for-react";
import { BarChart, PieChart } from "lucide-react";
import { useRef, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { DateRange, Title } from "../../components";
import { useChangeColor } from "../../hooks";
import { stations } from "../../json/stations";

const dataSun = stations.map((station) => {
  return {
    name: station.name,

    children: station.stations.map((childStation) => {
      return {
        name: childStation.name,
        value: Math.floor(Math.random() * 100),
      };
    }),
  };
});

const getData = () => {
  const childs: { name: string; value: number }[] = [];
  dataSun.forEach((item) => {
    childs.push(...item.children);
  });

  return childs;
};

const barOpts = {
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

      data: getData().map((item) => item.name),
    },
  ],

  universalTransition: true,

  series: [
    {
      id: "population",
      type: "bar",
      name: getData().map((item) => item.name),
      showBackground: true,
      data: getData().map((item) => item.value),
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
      // label: {
      //   show: true,
      //   formatter: "{b}",
      //   position: "outside",
      // },
    },
  ],
  animationEasing: "elasticOut",

  animationDelayUpdate: function (idx) {
    return idx * 5;
  },
} as EChartsOption;

export const StatisticsMetro = () => {
  const [dark] = useLocalStorage("dark", true);
  const echartsRef = useRef<ReactEcharts | null>(null);
  const [segment, setSegment] = useState<"count" | "amount">("count");

  const pieColor = useChangeColor();

  const pieOpts = {
    backgroundColor: "transparent",

    tooltip: {},
    legend: {},
    toolbox: {},
    universalTransition: true,
    series: {
      id: "population",
      type: "sunburst",
      universalTransition: true,
      itemStyle: {
        borderColor: pieColor,
      },
      levels: [
        {},
        {
          r0: "20%",
          r: "60%",
          label: {
            align: "center",
          },
          itemStyle: {
            borderWidth: 4,
          },
        },
        {
          r0: "60%",
          r: "72%",
          label: {
            position: "outside",
            padding: 3,
            silent: false,
            minMargin: 100,
          },
          itemStyle: {
            borderWidth: 3,
          },
        },
      ],
      data: dataSun,
    },
  } as EChartsOption;

  const handleChangeChart = (e: SegmentedValue) => {
    if (echartsRef.current) {
      console.log(e);
      const chartInstance = echartsRef.current.getEchartsInstance();
      if (e === "pie") {
        chartInstance.setOption(pieOpts, true);
      }
      if (e === "bar") {
        chartInstance.setOption(barOpts, true);
      }
    }
  };

  return (
    <div className="w-full px-4">
      <div className="flex justify-between items-center">
        <Title>Статискика в метро по линиям</Title>

        <DateRange />
      </div>
      <div className="my-4 flex justify-end items-center">
        <div className="flex items-center gap-4">
          <Segmented
            onChange={handleChangeChart}
            options={[
              {
                label: (
                  <div className="flex items-center gap-3">
                    <PieChart width={25} height={18} />
                  </div>
                ),
                value: "pie",
              },
              {
                label: (
                  <div className="flex items-center gap-3">
                    <BarChart size={20} />
                  </div>
                ),
                value: "bar",
              },
            ]}
          />

          <Segmented
            onChange={(e) => setSegment(e as "count" | "amount")}
            options={[
              {
                label: "Количество",
                value: "count",
              },
              {
                label: "Сумма",
                value: "amount",
              },
            ]}
          />
        </div>
      </div>
      <ReactEcharts
        ref={echartsRef}
        theme={dark ? "dark" : ""}
        className="[&_div]:!w-auto [&_div]:!h-auto mb-14"
        style={{ width: "100%", height: "700px" }}
        option={pieOpts}
      />
    </div>
  );
};
