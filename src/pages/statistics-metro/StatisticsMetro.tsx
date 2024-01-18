import ReactEcharts from "echarts-for-react";
import { EChartsOption } from "echarts";
import { useContext, useEffect, useRef, useState } from "react";
import { DashboardContext } from "../../layout";
import { stations } from "../../json/stations";
import { Button, Segmented } from "antd";

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
    },
  ],
  animationEasing: "elasticOut",

  animationDelayUpdate: function (idx) {
    return idx * 5;
  },
} as EChartsOption;

const pieOpts = {
  backgroundColor: "transparent",
  title: {
    show: true,
    text: "Metro Statistics",
  },
  tooltip: {},
  legend: {},
  toolbox: {},
  universalTransition: true,
  series: {
    id: "population",
    type: "sunburst",
    universalTransition: true,

    levels: [
      {},
      {
        r0: "20%",
        r: "60%",
        label: {
          align: "center",
        },
      },
      {
        r0: "60%",
        r: "72%",
        label: {
          position: "outside",
          padding: 3,
          silent: false,
        },
        itemStyle: {
          borderWidth: 3,
        },
      },
    ],
    data: dataSun,
  },
} as EChartsOption;

export const StatisticsMetro = () => {
  const { dark } = useContext(DashboardContext);
  const echartsRef = useRef<ReactEcharts | null>(null);
  const [change, setChange] = useState(false);
  const [segment, setSegment] = useState<"conut" | "amount">("conut");
  useEffect(() => {
    if (echartsRef.current) {
      const chartInstance = echartsRef.current.getEchartsInstance();

      if (change) {
        chartInstance.setOption(barOpts, true);
      } else {
        chartInstance.setOption(pieOpts, true);
      }
    }
  }, [change]);

  const handleChange = () => {
    setChange((prev) => !prev);
  };

  return (
    <div>
      <div className="my-4 flex justify-between items-center">
        <Button onClick={handleChange}>Change</Button>

        <Segmented
          onChange={(e) => setSegment(e as "conut" | "amount")}
          options={[
            {
              label: "Conut",
              value: "conut",
            },
            {
              label: "Amount",
              value: "amount",
            },
          ]}
        />
      </div>
      <ReactEcharts
        ref={echartsRef}
        theme={dark ? "dark" : ""}
        className="[&_div]:!w-auto [&_div]:!h-auto mb-14"
        style={{ width: "100%", height: "720px" }}
        option={pieOpts}
      />
    </div>
  );
};
