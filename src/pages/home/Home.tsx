import { Card, ChartsCard, Map, StatisticsCard } from "../../components";
import Eerth from "../../assets/earth.svg?react";

const lineData = [
  {
    name: "Yunusobod",
    value: 17433,
    color: "#27AE61FF",
  },
  {
    name: "Circle",
    value: 15433,
    color: "#56CCF3FF",
  },
  {
    name: "Uzbekistan",
    value: 20000,
    color: "#3080ECFF",
  },
  {
    name: "Chilanzar",
    value: 42334,
    color: "#F23E5BFF",
  },
];

export const Home = () => {
  return (
    <>
      <Eerth className="svg-file absolute object-cover w-full h-full z-[-1] left-0 right-0 top-16 bottom-0 m-auto" />
      <div className="mt-5 flex justify-between flex-wrap gap-7">
        <div className="flex flex-col flex-1 gap-5 min-w-[300px]  max-w-[700px] mx-auto lg:max-w-[900px]">
          <Card />
          <ChartsCard
            title="Metro lines"
            option={{
              yAxis: [
                {
                  type: "category",
                  position: "left",
                  axisTick: {
                    show: false,
                  },
                  splitLine: {
                    show: false,
                  },
                  data: lineData.map((line) => line.name),
                },
                {
                  type: "category",
                  position: "right",
                  axisTick: {
                    show: false,
                  },
                  axisLine: {
                    show: false,
                  },
                  splitLine: {
                    show: false,
                  },
                  data: lineData.map((line) => {
                    return line.value.toLocaleString("ru");
                  }),
                },
              ],
              xAxis: {
                splitLine: {
                  show: false,
                },
                show: false,
              },

              series: [
                {
                  animationDelay(idx) {
                    return +((idx + 1).toString() + "00");
                  },
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 101,
                      opacity: 0.7,
                      decal: "none",
                      borderCap: "square",
                    },
                    // focus: "self",
                  },

                  animationEasing: "bounceOut",
                  showBackground: true,
                  backgroundStyle: {
                    color: "#c9c9c99d",
                    borderRadius: [0, 20, 20, 0],
                  },
                  data: lineData,
                  type: "bar",
                  barWidth: 10,

                  itemStyle: {
                    borderRadius: [0, 20, 20, 0],
                    color: (params) => {
                      //@ts-ignore
                      return params.data.color;
                    },
                  },
                },
              ],
            }}
          />
          <ChartsCard
            title="Bearth turnover"
            option={{
              tooltip: {
                transitionDuration: 1.5,
              },
              series: [
                {
                  animationDelay(idx) {
                    return +((idx + 1).toString() + "00");
                  },
                  animationEasing: "bounceOut",
                  emphasis: {
                    focus: "self",
                  },
                  data: [4, 4.5, 2.8, 3.6, 3.8],
                  type: "bar",
                  label: {
                    show: true,
                    position: "top",
                    color: "",
                  },
                  barWidth: 15,
                  color: "#27AC5FFF",
                  itemStyle: {
                    borderRadius: [20, 20, 0, 0],
                  },
                },
              ],
            }}
          />
        </div>
        <div className="flex flex-col -order-1 lg:order-[0] items-stretch min-w-[500px]  md:flex-auto gap-5">
          <StatisticsCard />
          <div className="h-full min-h-[400px]">
            <Map />
          </div>
        </div>

        <div className="flex flex-col flex-1 min-w-[300px] max-w-[700px] mx-auto gap-5">
          <ChartsCard title="Parking statistics" />
          <ChartsCard
            title="Metro and Bus"
            option={{
              tooltip: {
                trigger: "axis",
                showContent: true,
                transitionDuration: 1.5,
              },
              grid: {
                left: "3%",
                right: "4%",
                bottom: "15%",
                top: "20%",
                containLabel: true,
              },
              legend: {
                data: ["Bus", "Metro"],
                textStyle: {
                  color: "#959595",
                },

                orient: "horizontal",
                right: 0,
                top: 0,
              },

              xAxis: {
                type: "category",
                boundaryGap: false,
                splitLine: {
                  show: false,
                },
                data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              },
              yAxis: {
                type: "value",
                splitLine: {
                  show: false,
                },
              },

              series: [
                {
                  markPoint: {
                    data: [{ type: "max", name: "Max" }],
                  },

                  name: "Bus",
                  type: "line",
                  symbol: "circle",
                  animationEasing: "quadraticIn",
                  data: [100, 132, 101, 134, 90, 300, 210],
                  emphasis: {
                    focus: "self",
                  },
                },
                {
                  name: "Metro",
                  type: "line",
                  symbol: "circle",
                  animationEasing: "quadraticIn",
                  markPoint: {
                    data: [{ type: "max", name: "Max" }],
                  },
                  emphasis: {
                    focus: "self",
                  },
                  data: [120, 122, 211, 13, 100, 230, 410],
                },
              ],
            }}
          />

          <ChartsCard
            title="Cards statistics"
            option={{
              xAxis: {
                show: false,
              },
              yAxis: {
                show: false,
              },
              tooltip: {},
              legend: {
                orient: "vertical",
                left: "1%",
                top: "1%",
                textStyle: {
                  color: "#959595",
                },
              },

              series: [
                {
                  name: "Access From",
                  center: ["70%", "40%"],
                  type: "pie",
                  radius: ["25%", "40%"],
                  label: {
                    color: "",
                  },
                  data: [
                    { value: 1048, name: "Uzcard" },
                    { value: 735, name: "Humo" },
                    { value: 580, name: "Transport" },
                    { value: 484, name: "Virtual card" },
                    { value: 300, name: "Cash" },
                  ],

                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: "rgba(0, 0, 0, 0.5)",
                    },
                  },
                },
              ],
            }}
          />
        </div>
      </div>
    </>
  );
};

// <div className="mt-5 grid grid-cols-4  gap-8">
// <Card />
// <Card className="col-span-2" />
// <Card />
// <Card />
// <div className="row-span-3">
//   <Card />
// </div>
// <Card />
// <Card />
// <Card />
// </div>
