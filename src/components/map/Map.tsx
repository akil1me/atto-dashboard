import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";
import geoJson from "../../json/uz.json";
import { useEffect, useRef } from "react";

//@ts-ignore
echarts.registerMap("uzbekistan", geoJson);

interface dataTypes {
  name: string;
  value: number;
}

console.log(geoJson.features.map((f) => f.properties.name));

const data = geoJson.features.map((f) => {
  return {
    name: f.properties.name,
    value:
      f.properties.name === "Toshkent sh"
        ? 4822023
        : f.properties.name === "Yangiyo'l tumani"
        ? 6000
        : 0,
  };
});

// const data: dataTypes[] = [
//   { name: "Termez", value: 4822023 },
//   { name: "Namangan viloyati", value: 731449 },
//   { name: "Toshkent viloyati", value: 6553255 },
//   { name: "Fargʻona viloyati", value: 2949131 },
//   { name: "Andijon viloyati", value: 38041430 },
//   { name: "Sirdaryo viloyati", value: 5187582 },
//   { name: "Jizzax viloyati", value: 3590347 },
//   { name: "Navoiy viloyati", value: 917092 },
//   { name: "Samarqand viloyati", value: 632323 },
//   { name: "Qashqadaryo viloyati", value: 19317568 },
//   { name: "Surxondaryo viloyati", value: 9919945 },
//   { name: "Buxoro viloyati", value: 1392313 },
//   { name: "Xorazm viloyati", value: 1595728 },
//   { name: "Qoraqalpogʻiston Respublikasi", value: 12875255 },
// ];

const mapOption: echarts.EChartsOption = {
  tooltip: {
    formatter: "{b} : {c} sum",
    // formatter: (params: any) => {
    //   const { data }: { data: dataTypes } = params;
    //   return `${data.name}:  ${data.value.toLocaleString("ru")} sum`;
    // },
    // transitionDuration: 1,
  },

  series: [
    {
      id: "population",
      type: "map",
      roam: false,
      map: "uzbekistan",

      animation: true,
      animationEasing: "circularIn",

      zoom: 1.2,

      emphasis: {
        itemStyle: {
          areaColor: "#51FFFEFF",
        },
      },
      itemStyle: {
        areaColor: "#058197",
        borderColor: "#fff",
      },

      universalTransition: true,
      data,
    },
  ],
};

export const Map = () => {
  const chartRef = useRef<ReactEcharts | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleWindowResize = () => {
    const chartInstance = chartRef.current?.getEchartsInstance();
    if (chartInstance) {
      chartInstance.resize();
    }
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(handleWindowResize);

    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => {
      if (containerRef.current) resizeObserver.unobserve(containerRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      <ReactEcharts
        echarts={echarts}
        ref={chartRef}
        option={mapOption}
        className="[&_div]:!w-auto [&_div]:!h-auto"
        style={{ width: "100%", height: "500px" }}
        // onEvents={onEvents}
      />
    </div>
  );
};
