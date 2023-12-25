import { Card, ChartsCard, Map, StatisticsCard } from "../../components";

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
    <div className="mt-5 flex justify-between gap-7">
      <div className="flex flex-col flex-1 gap-7">
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
                data: lineData.map((line) => line.value),
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
            series: [
              {
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
      <div className="flex flex-col  items-stretch flex-auto gap-7">
        <StatisticsCard />
        <div className="h-full">
          <Map />
        </div>
      </div>

      <div className="flex flex-col flex-1  gap-7">
        <ChartsCard title="Parking statistics" />
        <ChartsCard
          title="Metro and Bus"
          option={{
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
                name: "Bus",
                type: "line",

                data: [100, 132, 101, 134, 90, 230, 210],
              },
              {
                name: "Metro",
                type: "line",

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
                center: ["70%", "45%"],
                type: "pie",
                radius: ["30%", "50%"],
                label: {
                  color: "",
                },
                itemStyle: {
                  borderRadius: 4,
                },
                data: [
                  { value: 1048, name: "Search Engine" },
                  { value: 735, name: "Direct" },
                  { value: 580, name: "Email" },
                  { value: 484, name: "Union Ads" },
                  { value: 300, name: "Video Ads" },
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
