import { EChartsOption } from "echarts";
import ReactEcharts from "echarts-for-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Title } from "../../components";
import { useChangeColor } from "../../hooks";
import { fakeData } from "./fakeData";

type TariffsTypes =
  | "1"
  | "5"
  | "7"
  | "10"
  | "15"
  | "20"
  | "30"
  | "90"
  | "180"
  | "365"
  | "Monthly";

type TariffsData =
  | "\u041B\u044C\u0433\u043E\u0442\u043D\u044B\u0439 Mintrans"
  | "AVM"
  | "TM"
  | "O`M";

const data = [
  {
    name: "AV/AVM",
    bus: 123,
    metro: 234,
  },
  {
    name: "O'/O'M",
    bus: 323,
    metro: 634,
  },
  {
    name: "T/TM",
    bus: 423,
    metro: 534,
  },
  {
    name: "N/NM",
    bus: 23,
    metro: 34,
  },
];

const getTariffs = () => Object.keys(fakeData.metro.AVM);

const newData = getTariffs().map((item) => {
  const tariff = item as TariffsTypes;
  return {
    product: isNaN(+tariff) ? "Месяц" : tariff + " день",
    AVM: fakeData.metro.AVM[tariff],
    "O`M": fakeData.metro["O`M"][tariff],
    TM: fakeData.metro.TM[tariff],
    "\u041B\u044C\u0433\u043E\u0442\u043D\u044B\u0439 Mintrans":
      fakeData.metro["Льготный Mintrans"][tariff],
  };
});

const getOptimalData = () => {
  const bus = fakeData.bus;
  const arr = [];
  for (let key in bus) {
    const total = Object.values(bus[key as TariffsData]).reduce(
      (acc, curr) => Number(acc) + Number(curr),
      0
    );
    if ((total as number) > 1) {
      arr.push({
        name: key,
        data: bus[key as TariffsData],
      });
    }
  }
  return arr;
};
console.log(newData);

// const pie

export const Tariffs = () => {
  const [dark] = useLocalStorage("dark", true);
  const echartsRef = useRef<ReactEcharts | null>(null);
  const busRef = useRef<ReactEcharts | null>(null);
  const [busIndex, setBusIndex] = useState(10);
  const pieColor = useChangeColor();

  const hanldeChange = (evt: unknown) => {
    const index = evt as { dataIndex?: number };
    if (index.dataIndex || index.dataIndex === 0) {
      setBusIndex(index.dataIndex);
    }
  };

  useEffect(() => {
    if (echartsRef.current) {
      const chartInstance = echartsRef.current.getEchartsInstance();

      chartInstance.on("updateAxisPointer", (evt) => {
        console.log(evt);
      });
    }
  }, []);

  useEffect(() => {
    if (busRef.current) {
      const chartInstance = busRef.current.getEchartsInstance();
      chartInstance.on("updateAxisPointer", hanldeChange);

      return () => {
        chartInstance.off("updateAxisPointer", hanldeChange);
      };
    }
  }, [dark]);

  const pieChartData = useMemo(
    () =>
      Object.keys(newData[busIndex])
        .slice(1)
        .map((item) => {
          return {
            name: item,
            value: newData[busIndex][item as TariffsData],
          };
        }),
    [busIndex]
  );

  const option = useMemo(
    () =>
      ({
        backgroundColor: "",
        title: {
          text: "Метро",
        },

        tooltip: {
          trigger: "axis",

          axisPointer: {
            // Use axis to trigger tooltip
            type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
          },
        },

        dataset: {
          source: newData,
        },
        legend: {},
        grid: {
          left: "3%",
          right: "50%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          gridIndex: 0,
        },
        yAxis: {
          type: "category",
        },
        series: [
          {
            type: "bar",
            stack: "total",

            emphasis: {
              focus: "series",
            },
            animationEasing: "elasticOut",
            animationEasingUpdate: "elasticOut",
            animationDelay: 100,
          },
          {
            type: "bar",
            stack: "total",

            emphasis: {
              focus: "series",
            },
            animationEasing: "elasticOut",
            animationEasingUpdate: "elasticOut",
            animationDelay: 200,
          },
          {
            type: "bar",
            stack: "total",

            emphasis: {
              focus: "series",
            },
            animationEasing: "elasticOut",
            animationEasingUpdate: "elasticOut",
            animationDelay: 300,
          },
          {
            type: "bar",
            stack: "total",

            emphasis: {
              focus: "series",
            },
            animationEasing: "elasticOut",
            animationEasingUpdate: "elasticOut",
            animationDelay: 400,
          },
          {
            type: "pie",

            // dataGroupId: 1,
            center: ["80%", "50%"],
            radius: [35, 130],
            // radius: "30%",
            emphasis: {
              label: {
                show: true,
                fontSize: 24,
                fontWeight: "bold",
              },
              focus: "self",
              shadowColor: "#fff",
            },
            data: pieChartData,
            selectedMode: "single",
            itemStyle: {
              shadowBlur: 2,
              shadowColor: pieColor,
              borderWidth: 4,
              borderRadius: 10,
              borderColor: pieColor,
            },
            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay(idx) {
              if (idx) {
                return +(idx.toString() + "00");
              }
            },
            universalTransition: true,
            animationDuration: 2000,
            label: {
              formatter: "{b}: {@2012} ({d}%)",
            },
          },
        ],
      } as EChartsOption),
    [newData, pieChartData, dark]
  );
  // console.log(pieChartData);

  return (
    <div className="mt-6 px-4">
      <Title className="mb-10">Диаграмма по тарифным планам </Title>
      <div className="flex items-center gap-5 flex-col">
        <ReactEcharts
          ref={busRef}
          theme={dark ? "dark" : ""}
          className="[&_div]:!w-auto [&_div]:!h-auto mb-14"
          style={{ width: "100%", height: "700px" }}
          // onEvents={{
          //   updateAxisPointer: (event: { dataIndex?: number }) => {
          //     const { dataIndex } = event;
          //     if (dataIndex || dataIndex === 0) {
          //       setBusIndex(dataIndex);
          //     }
          //   },
          // }}
          option={option}
        />

        <ReactEcharts
          theme={dark ? "dark" : ""}
          className="[&_div]:!w-auto [&_div]:!h-auto mb-14"
          style={{ width: "100%", height: "700px" }}
          option={
            {
              backgroundColor: "",
              title: {
                text: "Автобус",
              },

              tooltip: {
                trigger: "axis",

                axisPointer: {
                  // Use axis to trigger tooltip
                  type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
                },
              },

              legend: {},
              grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",

                containLabel: true,
              },
              xAxis: {
                type: "value",
              },
              yAxis: {
                type: "category",
                data: getTariffs().map((item) => {
                  const tariff = item as TariffsTypes;
                  return isNaN(+tariff) ? "Месяц" : tariff + " день";
                }),
              },
              animationType: "scale",

              series: [
                ...getOptimalData()
                  .slice(1)
                  .map((item, i) => {
                    return {
                      name: item.name,
                      type: "bar",
                      stack: "total",

                      emphasis: {
                        focus: "series",
                      },

                      animationEasing: "elasticOut",
                      animationEasingUpdate: "elasticOut",
                      animationDelay: +((i + 1).toString() + "00"),
                      data: Object.values(
                        fakeData.bus[item.name as TariffsData]
                      ),
                    };
                  }),

                {
                  name: getOptimalData()[0].name,
                  type: "bar",
                  stack: "total",

                  emphasis: {
                    focus: "series",
                  },
                  animationEasing: "elasticOut",
                  animationEasingUpdate: "elasticOut",
                  animationDelay(idx) {
                    return +((idx + 1).toString() + "00");
                  },
                  data: Object.values(
                    fakeData.bus[getOptimalData()[0].name as TariffsData]
                  ),
                },
              ],
            } as EChartsOption
          }
        />
      </div>
      <ReactEcharts
        ref={echartsRef}
        theme={dark ? "dark" : ""}
        className="[&_div]:!w-auto [&_div]:!h-auto"
        style={{ width: "100%", height: "700px" }}
        option={
          {
            backgroundColor: "",
            tooltip: {
              trigger: "axis",
            },
            title: {
              text: "Общая статистика тарифных планов",
            },
            legend: {},

            calculable: true,
            xAxis: [
              {
                type: "category",
                // prettier-ignore
                data: data.map((item) => item.name),
              },
            ],
            yAxis: [
              {
                type: "value",
              },
            ],

            series: [
              {
                name: "Метро",
                type: "bar",
                data: data.map((item) => item.metro),
                animationEasing: "elasticOut",
                animationEasingUpdate: "elasticOut",
                animationDelay(idx) {
                  return +((idx + 1).toString() + "00");
                },
                markPoint: {
                  data: [
                    { type: "max", name: "Max" },
                    { type: "min", name: "Min" },
                  ],
                },
                markLine: {
                  data: [{ type: "average", name: "Avg" }],
                },

                barMaxWidth: 70,
                universalTransition: true,
              },
              {
                name: "Автобус",
                type: "bar",
                data: data.map((item) => item.bus),
                markPoint: {
                  data: [
                    { name: "Max", value: 182.2, xAxis: 7, yAxis: 183 },
                    { name: "Min", value: 2.3, xAxis: 11, yAxis: 3 },
                  ],
                },
                markLine: {
                  data: [{ type: "average", name: "Avg" }],
                },
                barMaxWidth: 70,
                universalTransition: true,
                animationEasing: "elasticOut",
                animationEasingUpdate: "elasticOut",
                animationDelay(idx) {
                  return +((idx + 1).toString() + "00");
                },
              },
            ],
          } as EChartsOption
        }
      />
    </div>
  );
};
