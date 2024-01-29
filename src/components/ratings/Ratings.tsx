// Generate data

import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";
import { useContext } from "react";
import { Title } from "..";
import { DashboardContext } from "../../layout";
import { ratingData } from "./ratingBus";

let category = [];
let lineData = [];
let barData = [];

for (let i = 0; i < ratingData.length; i++) {
  category.push(ratingData[i].name);
  let b = Math.random() * 5;
  barData.push(b);
  lineData.push(5);
}

// option
const option: echarts.EChartsOption = {
  backgroundColor: "transparent",
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    // formatter: "{c}",
    formatter: function (params) {
      const bar = params as { value: number }[];
      return `<div class="flex items-center gap-2"><svg height="16px" width="16px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 47.94 47.94" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style="fill:#ecbe18;" d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 C22.602,0.567,25.338,0.567,26.285,2.486z"></path> </g></svg> ${bar[0].value.toFixed(
        2
      )}</div>`;
    },
  },

  xAxis: {
    splitLine: { show: false },
  },

  yAxis: {
    data: category,
    axisTick: { show: false },
  },
  grid: {
    containLabel: true,
  },
  series: [
    {
      name: "bar",
      type: "bar",
      barWidth: 10,
      animationDelay(idx) {
        return +((idx + 1).toString() + "00");
      },
      animationEasing: "elasticOut",
      animationEasingUpdate: "elasticOut",

      itemStyle: {
        borderRadius: 5,
      },
      data: barData,
    },
    {
      name: "max",
      type: "bar",
      barGap: "-100%",
      // animationDelay(idx) {
      //   return +((idx + 1).toString() + "00");
      // },
      // animationEasing: "elasticOut",
      // animationEasingUpdate: "elasticOut",
      barWidth: 10,

      itemStyle: {
        borderRadius: 5,
        opacity: 0.5,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgba(28, 4, 182, 0.5)" },
          { offset: 0.2, color: "rgba(20, 65, 212, 0.2)" },
          { offset: 1, color: "rgba(20, 65, 212, 0)" },
        ]),
      },
      z: -12,
      data: lineData,
    },
  ],
};

export const Ratings = () => {
  const { dark } = useContext(DashboardContext);
  return (
    <div className="p-4">
      <Title>Рейтинг автобусов по автопарком</Title>
      <ReactEcharts
        theme={dark ? "dark" : ""}
        className="[&_div]:!w-auto [&_div]:!h-auto mb-14 mt-4"
        style={{ width: "100%", height: "700px" }}
        option={option}
      />
    </div>
  );
};
