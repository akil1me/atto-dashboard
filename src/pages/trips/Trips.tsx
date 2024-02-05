import { Segmented } from "antd";
import { SegmentedValue } from "antd/es/segmented";
import dayjs from "dayjs";
import dayjsRandom from "dayjs-random";
import "dayjs/locale/ru";
import "dayjs/locale/uz-latn";
import "dayjs/locale/en";

import durtion from "dayjs/plugin/duration";
import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";
import { BarChart, LineChartIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "usehooks-ts";
import { DateRange, Title } from "../../components";
import { TabsUI } from "../../components/ui/tabs-ui";
import { useChangeColor } from "../../hooks";

dayjs.extend(dayjsRandom);
dayjs.extend(durtion);
// console.log();

const hexColors = [
  "#3498db", // Синий
  "#2ecc71", // Зеленый
  "#e74c3c", // Красный
  "#f39c12", // Оранжевый
  "#9b59b6", // Фиолетовый
  "#1abc9c", // Бирюзовый
  "#e67e22", // Желтый
  "#34495e", // Темно-серый
  "#14FFF7", // Светло-серый
].reverse();

type DataType = {
  product?: string;
} & {
  [key: string]: number | string;
};

type DataTypePie = keyof DataType;

export const tripsDataJson = {};

const getHours = () => {
  const result = [];
  for (let i = 0; i < 24; i++) {
    result.push(i + ":00");
  }

  return result;
};

const dateDay: DataType[] = getHours().map((hour) => {
  return {
    product: hour,
    "Тарифный план": Math.floor(Math.random() * 100),
    Qr: Math.floor(Math.random() * 100),
    "Траснпорная карта": Math.floor(Math.random() * 100),
    "Банковская карта": Math.floor(Math.random() * 300),
    "Виртуальная карта": Math.floor(Math.random() * 100),
    "Льготные поездки": Math.floor(Math.random() * 100),
    Аггрегаторы: Math.floor(Math.random() * 100),
    "Наличной оплате": Math.floor(Math.random() * 100),
  };
});

export const Trips = () => {
  const echartsRef = useRef<ReactEcharts | null>(null);
  const [dark] = useLocalStorage("dark", true);
  const [lang] = useLocalStorage("lang", "ru");
  // const {} = useGetData("operator/dashboard/metro/stations", ["metro"]);
  const [hour, setHour] = useState(6);
  const [data, setData] = useState(dateDay);
  const [chartType, setChartType] = useState<"bar" | "line">("line");
  const [dateFormat, setDateFormat] = useState("daily");
  const pieColor = useChangeColor();
  const { t } = useTranslation();

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

  const getDays = useCallback(() => {
    const weekdaysArray = [];
    dayjs.locale(lang === "uz" ? "uz-latn" : lang);
    for (let i = 1; i <= 7; i++) {
      const dayName = dayjs()
        .day(i % 7)
        .format("dddd"); // Используем i % 7, чтобы циклически обходить дни недели
      weekdaysArray.push(dayName.slice(0, 1).toUpperCase() + dayName.slice(1));
    }

    return weekdaysArray;
  }, [lang]);

  const dataWeekly: DataType[] = getDays().map((day) => {
    return {
      product: day,
      "Тарифный план": Math.floor(Math.random() * 1000),
      Qr: Math.floor(Math.random() * 1000),
      "Траснпорная карта": Math.floor(Math.random() * 1000),
      "Банковская карта": Math.floor(Math.random() * 1500),
      "Виртуальная карта": Math.floor(Math.random() * 1000),
      "Льготные поездки": Math.floor(Math.random() * 1000),
      Аггрегаторы: Math.floor(Math.random() * 1000),
      "Наличной оплате": Math.floor(Math.random() * 1000),
    };
  });

  const handleChangeFormat = (e: SegmentedValue) => {
    setHour(6);
    setDateFormat(e as string);
    if (e === "weekly") {
      setData(dataWeekly);
    } else {
      setData(dateDay);
    }
  };

  const lineData = [...data].map((item) => {
    const itemNums = Object.values(item).filter(
      (item) => typeof item === "number"
    );

    let total = itemNums.reduce((acc, curr) => Number(acc) + Number(curr), 0);

    return { ...item, Total: chartType === "line" ? total : null };
  });

  const pieChartData = Object.keys(data[hour])
    .slice(1)
    .map((item) => {
      return {
        name: item,
        value: data[hour][item as DataTypePie],
      };
    });

  return (
    <div className="px-4 mt-6 ">
      <div className="flex items-center justify-between">
        <Title className="mb-6">{t("trips.title")}</Title>
        <DateRange
          showFilter
          filters={
            <Segmented
              onChange={handleChangeFormat}
              options={[
                {
                  label: "По часам",
                  value: "daily",
                },
                {
                  label: "По дням недели",
                  value: "weekly",
                },
                {
                  label: "По дням месца",
                  value: "monthly",
                  disabled: true,
                },
                {
                  label: "По месцам",
                  value: "yearly",
                  disabled: true,
                },
              ]}
            />
          }
        />
      </div>
      <div className="flex items-center justify-between">
        <TabsUI />

        <div className="flex items-center gap-2">
          <Segmented
            onChange={(e) => setChartType(e as "line" | "bar")}
            options={[
              {
                label: (
                  <div className="flex items-center gap-2">
                    <LineChartIcon size={20} strokeWidth={1.5} />
                  </div>
                ),
                value: "line",
              },
              {
                label: (
                  <div className="flex items-center gap-2">
                    <BarChart size={20} strokeWidth={1.5} />
                  </div>
                ),
                value: "bar",
              },
            ]}
          />
        </div>
      </div>

      <ReactEcharts
        ref={echartsRef}
        theme={dark ? "dark" : ""}
        className="[&_div]:!w-auto [&_div]:!h-auto mb-5"
        style={{ width: "100%", height: "800px" }}
        option={
          {
            title: {
              text:
                dateFormat === "daily"
                  ? `${t("trips.time")} ${hour}:00 - ${hour}:59`
                  : getDays()[hour],
              left: 0,
              right: 0,
            },
            backgroundColor: "",

            legend: {},
            tooltip: {
              trigger: chartType === "bar" ? "item" : "axis",
              axisPointer: {},
              order: "valueDesc",
              showContent: true,
              transitionDuration: 1.5,
            },

            dataset: {
              source: lineData,
            },
            xAxis: {
              type: "category",
              offset: 10,
              boundaryGap: chartType === "bar",
            },
            yAxis: {
              type: "value",
              gridIndex: 0,
              // max: 400,
              axisLine: {
                show: true,
              },
            },
            grid: {
              top: "50%",
              containLabel: true,
              left: dateFormat === "weekly" ? 40 : 20,
              right: dateFormat === "weekly" ? 40 : 20,
            },
            dataZoom: [
              {
                type: "slider",
                brushSelect: false,
                show: true,
                minSpan: 10,
              },
              {
                show: true,
                type: "inside",
                minSpan: 10,
              },
            ],
            universalTransition: true,

            series: [
              ...[...hexColors].map((color) => {
                return {
                  type: chartType,
                  smooth: true,
                  lineStyle: {
                    width: 2,
                  },

                  itemStyle: {
                    color: color,
                  },
                  maxBarWidth: dateFormat === "daily" ? 20 : 40,
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
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: color + "bc" }, // Start color (Sky Blue)
                      { offset: 0.5, color: color + "8a" }, // End color (Transparent)
                      { offset: 1, color: color + "2a" },
                    ]),
                  },
                };
              }),
              {
                type: "pie",

                // dataGroupId: 1,
                center: ["50%", "25%"],
                radius: [25, 110],
                // radius: "30%",
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
                  shadowBlur: 2,
                  shadowColor: pieColor,
                  borderWidth: 4,
                  borderRadius: 10,
                  borderColor: pieColor,
                },
                color: hexColors,
                animationType: "scale",
                animationEasing: "elasticOut",
                animationDelay(idx) {
                  if (idx) {
                    return +(idx.toString() + "00");
                  }
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

      {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
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
      </div> */}
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
