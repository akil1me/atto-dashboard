import { Segmented } from "antd";
import { SegmentedValue } from "antd/es/segmented";
import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";
import { BarChart } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import UzMap from "../../assets/uz.svg?react";
import { Title } from "../../components";
import geoJson from "../../json/regions.json";

echarts.registerMap("uzb", {
  //@ts-ignore
  geoJSON: geoJson,
});

interface dataTypes {
  name: string;
  value: number;
}

const data = [
  {
    name: "Toshkent sh",
    value: 182220223,
    // itemStyle: {
    //   areaColor: "red",
    // },
  },
  {
    name: "Namangan viloyati",
    value: 731649,
  },
  {
    name: "Toshkent viloyati",
    value: 6523245,
  },
  { name: "Fargʻona viloyati", value: 2949131 },
  { name: "Andijon viloyati", value: 380430 },
  { name: "Sirdaryo viloyati", value: 518722 },
  { name: "Jizzax viloyati", value: 0 },
  { name: "Navoiy viloyati", value: 917082 },
  { name: "Samarqand viloyati", value: 9323023 },
  { name: "Qashqadaryo viloyati", value: 1931568 },
  { name: "Surxondaryo viloyati", value: 0 },
  { name: "Buxoro viloyati", value: 133423 },
  { name: "Xorazm viloyati", value: 159528 },
  { name: "Qoraqalpogʻiston Respublikasi", value: 0 },
];
data.sort(function (a, b) {
  return a.value - b.value;
});
const mapOption: echarts.EChartsOption = {
  backgroundColor: "transparent",
  tooltip: {
    formatter: (params) => {
      const { data } = params as { data: dataTypes };

      return `${data.name}:  ${data.value.toLocaleString("ru")} sum`;
    },
    transitionDuration: 1,
  },

  visualMap: {
    left: "right",
    min: 0,
    max: 1000000,
    inRange: {
      color: [
        "#313695",
        "#4575b4",
        "#74add1",
        "#abd9e9",
        "#e0f3f8",
        "#f1f1f1",
      ].reverse(),
    },
    text: ["High", "Low"],
    calculable: true,
  },
  series: [
    {
      id: "population",
      type: "map",
      roam: false,
      map: "uzb",

      animation: true,
      animationEasing: "circularIn",
      animationDurationUpdate: 3000,
      // zoom: 1.2,
      // emphasis: {
      //   itemStyle: {
      //     areaColor: "#51FFFEFF",
      //   },
      // },

      universalTransition: true,

      data,
    },
  ],
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
      splitLine: { show: false },
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
      data: data.map((item) => item.name),
    },
  ],

  universalTransition: true,

  series: [
    {
      id: "population",
      type: "bar",
      name: data.map((item) => item.name),
      showBackground: true,
      data: data.map((item) => item.value),
      universalTransition: true,
      animationDurationUpdate: 3000,
      itemStyle: {
        borderRadius: 5,
      },
    },
  ],
  animationEasing: "elasticOut",
} as echarts.EChartsOption;

export const Regions = () => {
  const chartRef = useRef<ReactEcharts | null>(null);
  const [dark] = useLocalStorage("dark", true);
  const containerRef = useRef<HTMLDivElement>(null);

  const [chartType, setChartType] = useState("map");
  const handleWindowResize = () => {
    if (chartRef.current) {
      chartRef.current.getEchartsInstance().resize();
    }
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(handleWindowResize);

    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => {
      if (containerRef.current) resizeObserver.unobserve(containerRef.current);
    };
  }, []);

  const handleChangeChart = (e: SegmentedValue) => {
    console.log(e);

    setChartType(e as "map" | "bar");
  };

  const option: echarts.EChartsOption = useMemo(
    () => (chartType === "map" ? mapOption : barOpts),
    [chartType]
  );

  return (
    <div ref={containerRef}>
      <Title>Очет по регионам</Title>
      <div className="flex justify-end items-center  mt-10 relative">
        <Segmented
          onChange={handleChangeChart}
          options={[
            {
              label: (
                <div className="flex items-center gap-3">
                  <UzMap width={25} height={18} />
                </div>
              ),
              value: "map",
            },
            {
              label: (
                <div className="flex items-center gap-3 relative">
                  <BarChart size={20} />
                </div>
              ),
              value: "bar",
            },
          ]}
        />
      </div>
      <ReactEcharts
        ref={chartRef}
        theme={dark ? "dark" : ""}
        option={option}
        notMerge={true}
        className="[&_div]:!w-auto [&_div]:!h-auto mt-7"
        style={{ width: "100%", height: "600px" }}
        // onEvents={onEvents}
      />
    </div>
  );
};
