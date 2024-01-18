import { Segmented, Tabs } from "antd";
import dayjs from "dayjs";
import dayjsRandom from "dayjs-random";
import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";
import { AlignCenter, BusFront, TrainFrontTunnel } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { useGetData } from "../../hooks";
import { DashboardContext } from "../../layout";
import durtion from "dayjs/plugin/duration";
dayjs.extend(dayjsRandom);
dayjs.extend(durtion);
// console.log();

interface DataType {
  product?: string;
  Total?: number;
  Tariffs: number;
  Qr: number;
  "Transport cards": number;
  "Bank cards": number;
  "Virtual cards": number;
  Privilege: number;
  Aggregator: number;
  "By cash": number;
}

type DataTypePie =
  | "product"
  | "Tariffs"
  | "Qr"
  | "Transport cards"
  | "Bank cards"
  | "Virtual cards"
  | "Privilege"
  | "Aggregator"
  | "By cash";

// interface DataType {
//   key: React.Key;
//   name: string | React.ReactNode;
//   chinese: number;
//   math: number;
// }

const items = [
  {
    text: "Metro",
    icon: (
      <div className="inline-block align-top">
        <TrainFrontTunnel />
      </div>
    ),
  },
  {
    text: "Bus",
    icon: (
      <div className="inline-block align-top">
        <BusFront />
      </div>
    ),
  },
];

export const tripsDataJson = {};
// const echartsRef = useRef();

const getHours = () => {
  const result = [];
  for (let i = 0; i < 24; i++) {
    result.push(i + ":00"); // Put loop counter into array with "00" next to it
  }

  return result;
};

const dateDay: DataType[] = getHours().map((hour) => {
  return {
    product: hour,
    Tariffs: Math.floor(Math.random() * 100),
    Qr: Math.floor(Math.random() * 100),
    "Transport cards": Math.floor(Math.random() * 100),
    "Bank cards": Math.floor(Math.random() * 300),
    "Virtual cards": Math.floor(Math.random() * 100),
    Privilege: Math.floor(Math.random() * 100),
    Aggregator: Math.floor(Math.random() * 100),
    "By cash": Math.floor(Math.random() * 100),
  };
});

const getDays = () => {
  const weekdaysArray = [];

  for (let i = 1; i <= 7; i++) {
    const dayName = dayjs()
      .day(i % 7)
      .format("ddd"); // Используем i % 7, чтобы циклически обходить дни недели
    weekdaysArray.push(dayName);
  }

  return weekdaysArray;
};

// console.log(dataWeekly());

const dataWeekly: DataType[] = getDays().map((day) => {
  return {
    product: day,
    Tariffs: Math.floor(Math.random() * 1000),
    Qr: Math.floor(Math.random() * 1000),
    "Transport cards": Math.floor(Math.random() * 1000),
    "Bank cards": Math.floor(Math.random() * 1500),
    "Virtual cards": Math.floor(Math.random() * 1000),
    Privilege: Math.floor(Math.random() * 1000),
    Aggregator: Math.floor(Math.random() * 1000),
    "By cash": Math.floor(Math.random() * 1000),
  };
});

const lineData = [...dateDay].map((item) => {
  const itemNums = Object.values(item).filter(
    (item) => typeof item === "number"
  );

  let total = itemNums.reduce((acc, curr) => acc + curr, 0);

  return { ...item, Total: total };
});
// console.log(fate);

export const Trips = () => {
  const echartsRef = useRef<ReactEcharts | null>(null);
  const { dark } = useContext(DashboardContext);
  const {} = useGetData("operator/dashboard/metro/stations", ["metro"]);
  const [hour, setHour] = useState(6);
  const [data, setData] = useState(dateDay);

  const hanldeChange = (evt: unknown) => {
    const index = evt as { dataIndex?: number };
    if (index.dataIndex || index.dataIndex === 0) {
      setHour(index.dataIndex);
    }
  };

  useEffect(() => {
    if (echartsRef.current) {
      const chartInstance = echartsRef.current.getEchartsInstance();
      chartInstance.on("updateAxisPointer", hanldeChange);

      return () => {
        chartInstance.off("updateAxisPointer", hanldeChange);
      };
    }
  }, []);

  const pieChartData = Object.keys(data[hour])
    .slice(1)
    .map((item) => {
      return {
        name: item,
        value: data[hour][item as DataTypePie],
      };
    });

  return (
    <div className="mt-6 px-4 ">
      <div className="flex justify-between items-center">
        <Tabs
          className="mb-4"
          size="large"
          defaultActiveKey="1"
          type="line"
          items={items.map((item, i) => {
            const id = String(i + 1);
            return {
              key: id,
              label: item.text,

              icon: item.icon,
            };
          })}
        />
        <Segmented
          options={[
            {
              label: "Daily",
              value: "daily",
            },
            {
              label: "Weekly",
              value: "weekly",
            },
            {
              label: "Monthly",
              value: "monthly",
              disabled: true,
            },
            {
              label: "Yearly",
              value: "yearly",
              disabled: true,
            },
          ]}
        />
      </div>

      <ReactEcharts
        ref={echartsRef}
        theme={dark ? "dark" : ""}
        className="[&_div]:!w-auto [&_div]:!h-auto mb-5"
        style={{ width: "100%", height: "1000px" }}
        option={
          {
            title: {
              text: `Time ${hour}:00 - ${hour}:59`,
              left: 0,
              right: 0,
            },
            backgroundColor: "",

            legend: {},
            tooltip: {
              trigger: "axis",
              showContent: true,
              transitionDuration: 1.5,
            },

            toolbox: {
              show: true,
              feature: {
                magicType: { show: true, type: ["line", "bar"] },
                restore: { show: true },
              },
            },

            dataset: {
              source: lineData,
            },
            xAxis: { type: "category", offset: 10, boundaryGap: false },
            yAxis: {
              type: "value",
              gridIndex: 0,
              // max: 400,
              axisLine: {
                show: true,
              },
            },
            grid: { top: "50%", containLabel: true },
            dataZoom: [
              {
                type: "slider",
                show: true,
                minSpan: 10,
              },
              {
                show: true,
                type: "inside",
                minSpan: 10,
              },
            ],

            series: [
              ...[...new Array(9)].map(() => {
                return {
                  type: "line",
                  smooth: true,
                  lineStyle: {
                    width: 2,
                  },
                  visualMap: [
                    {
                      show: false,
                      type: "continuous",
                      seriesIndex: 0,
                      min: 0,
                      max: 400,
                    },
                    {
                      show: false,
                      type: "continuous",
                      seriesIndex: 1,
                      dimension: 0,
                      min: 0,
                      max: lineData.length - 1,
                    },
                  ],
                  seriesLayoutBy: "row",
                  emphasis: {
                    focus: "series",
                    shadowColor: "rgba(0, 0, 0, 0.8)",
                  },
                  universalTransition: true,
                  symbol: "circle",
                  animationEasing: "quadraticIn",
                  markLine: {},
                  stack: "a",
                  areaStyle: {
                    opacity: 0.3,
                    shadowColor: "red",
                  },
                };
              }),
              {
                type: "pie",
                // roseType: "radius",

                // dataGroupId: 1,
                center: ["50%", "25%"],
                radius: [35, 130],
                emphasis: {
                  label: {
                    show: true,
                    fontSize: 24,
                    fontWeight: "bold",
                  },
                  focus: "self",
                  shadowColor: "rgba(0, 0, 0, 0.8)",
                },
                selectedMode: "single",
                itemStyle: {
                  borderRadius: 8,
                  borderColor: "white",

                  borderWidth: 2,
                  shadowColor: "red",
                },
                animationType: "scale",
                animationEasing: "elasticOut",
                animationDelay(idx) {
                  return +((idx + 1).toString() + "00");
                },
                data: pieChartData,
                universalTransition: true,
                animationDuration: 2000,
                label: {
                  formatter: "{b}: {@2012} ({d}%)",
                },
              },
            ],
          } as echarts.EChartsOption
        }
      />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Type of payment
              </th>
              <th scope="col" className="px-6 py-3">
                Paid count
              </th>
              <th scope="col" className="px-6 py-3">
                Paid sum
              </th>
            </tr>
          </thead>
          <tbody>
            {pieChartData.map((item) => {
              return (
                <tr
                  key={item.name}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.name}
                  </th>
                  <td className="px-6 py-4">{item.value}</td>
                  <td className="px-6 py-4">
                    {item.value && Math.floor(+item.value * 1700)}
                    <span> sum</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// series: [
//   {
//     type: "line",
//     smooth: true,
//     lineStyle: {
//       width: 4,
//     },
//     seriesLayoutBy: "row",
//     emphasis: { focus: "series" },
//     symbol: "circle",
//     animationEasing: "quadraticIn",
//     markLine: {},
//     datasetId: 1,
//   },
//   {
//     type: "line",
//     smooth: true,
//     lineStyle: {
//       width: 4,
//     },
//     seriesLayoutBy: "row",
//     emphasis: { focus: "series" },
//     symbol: "circle",
//     animationEasing: "quadraticIn",
//   },
//   {
//     type: "line",
//     smooth: true,
//     lineStyle: {
//       width: 4,
//     },
//     seriesLayoutBy: "row",
//     emphasis: { focus: "series" },
//     symbol: "circle",

//     animationEasing: "quadraticIn",
//   },
//   {
//     type: "line",
//     smooth: true,
//     seriesLayoutBy: "row",
//     emphasis: { focus: "series" },
//     symbol: "circle",
//     lineStyle: {
//       width: 4,
//     },

//     animationEasing: "quadraticIn",
//   },
//   {
//     type: "line",
//     smooth: true,
//     seriesLayoutBy: "row",
//     lineStyle: {
//       width: 4,
//     },
//     emphasis: { focus: "series" },
//     symbol: "circle",
//     animationEasing: "quadraticIn",
//     // label: {
//     //   show: true,
//     //   position: "top",
//     // },
//   },
//   {
//     type: "pie",
//     id: "pie",
//     roseType: "area",
//     dataGroupId: 1,
//     center: ["50%", "25%"],
//     radius: [35, 130],
//     emphasis: {
//       label: {
//         show: true,
//         fontSize: 24,
//         fontWeight: "bold",
//       },
//       focus: "self",
//     },
//     itemStyle: {
//       borderRadius: 8,
//       borderColor: "#fff",
//       borderWidth: 2,
//     },
//     animationType: "scale",
//     animationDelay: function (idx: number) {
//       if (idx) {
//         return idx * 100;
//       }
//     },
//     animationDuration: 2000,
//     label: {
//       formatter: "{b}: {@2012} ({d}%)",
//     },
//   },
// ];
