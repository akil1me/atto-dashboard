import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";
import geoJson from "../../json/regions.json";

//@ts-ignore
echarts.registerMap("uzbekistan", geoJson);

const mapOption: echarts.EChartsOption = {
  series: [
    {
      id: "population",
      type: "map",
      roam: false,
      map: "uzbekistan",
      animationDurationUpdate: 1000,
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
    },
  ],
};

export const Map = () => {
  return (
    <ReactEcharts
      option={mapOption}
      className="[&_div]:!w-auto [&_div]:!h-auto"
      style={{ width: "100%", height: "100%" }}
      // onEvents={onEvents}
    />
  );
};
