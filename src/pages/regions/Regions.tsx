import { Segmented } from "antd";
import { SegmentedValue } from "antd/es/segmented";
import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";
import { BarChart } from "lucide-react";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import UzMap from "../../assets/uz.svg?react";
import { Title } from "../../components";
import geoJson from "../../json/uz.json";
import { useTranslation } from "react-i18next";

interface GeoJSONFeature<G> {
  type: "Feature";
  id?: string | number;
  properties: {
    name?: string;
    cp?: number[];
    [key: string]: any;
  };
  geometry: G;
}

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
    value: 482220223,
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
    value: 1523245,
  },
  { name: "Fargʻona viloyati", value: 2949131 },
  { name: "Andijon viloyati", value: 380430 },
  { name: "Sirdaryo viloyati", value: 518722 },
  { name: "Jizzax viloyati", value: 0 },
  { name: "Navoiy viloyati", value: 917082 },
  { name: "Samarqand viloyati", value: 2323023 },
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
    max: 4000000,
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
      animationDurationUpdate: 1000,
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
      animationDurationUpdate: 1000,
      barMaxWidth: 15,
      itemStyle: {
        borderRadius: [0, 20, 20, 0],
      },
    },
  ],
  animationEasing: "elasticOut",
} as echarts.EChartsOption;

export const Regions = memo(() => {
  const chartRef = useRef<ReactEcharts | null>(null);
  const [dark] = useLocalStorage("dark", true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

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

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.getEchartsInstance().on("click", (params) => {
        console.log("params", params);
      });
    }
  }, []);

  const handleChangeChart = (e: SegmentedValue) => {
    setChartType(e as "map" | "bar");
  };

  const option: echarts.EChartsOption = useMemo(
    () => (chartType === "map" ? mapOption : barOpts),
    [chartType]
  );
  return (
    <div ref={containerRef}>
      <Title>{t("regions.title")}</Title>
      <div className="relative flex items-center justify-end mt-10">
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
                <div className="relative flex items-center gap-3">
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
      />
    </div>
  );
});
