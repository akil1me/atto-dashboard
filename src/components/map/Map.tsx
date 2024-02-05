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

const mapOption: echarts.EChartsOption = {
  tooltip: {
    formatter: "{b}",
    // formatter: (params: any) => {
    //   const { data }: { data: dataTypes } = params;
    //   return `${data.name}:  ${data.value.toLocaleString("ru")} sum`;
    // },
    transitionDuration: 1,
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
