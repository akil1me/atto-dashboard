import ReactEcharts from "echarts-for-react";
import { EChartsOption } from "echarts";
import { useContext, useEffect, useRef } from "react";
import { DashboardContext } from "../../layout";

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

const fakeData = {
  metro: {
    "Льготный Mintrans": {
      "1": 0,
      "5": 0,
      "7": 0,
      "10": 0,
      "15": 0,
      "20": 0,
      "30": 0,
      "90": 0,
      "180": 0,
      "365": 0,
      Monthly: 306,
    },

    AVM: {
      "1": 106,
      "5": 270,
      "7": 117,
      "10": 51,
      "15": 83,
      "20": 78,
      "30": 631,
      "90": 7,
      "180": 1,
      "365": 10,
      Monthly: 1068,
    },

    "O`M": {
      "1": 145,
      "5": 289,
      "7": 173,
      "10": 86,
      "15": 80,
      "20": 244,
      "30": 2926,
      "90": 26,
      "180": 13,
      "365": 4,
      Monthly: 371,
    },

    TM: {
      "1": 2444,
      "5": 3484,
      "7": 1786,
      "10": 768,
      "15": 808,
      "20": 760,
      "30": 11050,
      "90": 55,
      "180": 18,
      "365": 2,
      Monthly: 947,
    },
  },
  bus: {
    "Льготный Mintrans": {
      "1": 0,
      "5": 0,
      "7": 0,
      "10": 0,
      "15": 0,
      "20": 0,
      "30": 0,
      "90": 0,
      "180": 0,
      "365": 0,
      Monthly: 2009,
    },
    AV: {
      "1": 313,
      "5": 1018,
      "7": 473,
      "10": 238,
      "15": 299,
      "20": 325,
      "30": 4144,
      "90": 47,
      "180": 3,
      "365": 4,
      Monthly: 4203,
    },
    AVM: {
      "1": 236,
      "5": 472,
      "7": 197,
      "10": 99,
      "15": 172,
      "20": 178,
      "30": 1451,
      "90": 25,
      "180": 4,
      "365": 11,
      Monthly: 3162,
    },
    N: {
      "1": 135,
      "5": 610,
      "7": 189,
      "10": 153,
      "15": 263,
      "20": 317,
      "30": 10064,
      "90": 128,
      "180": 37,
      "365": 24,
      Monthly: 5357,
    },
    NM: {
      "5": 0,
      "10": 0,
      "15": 0,
      "20": 0,
      "30": 0,
      Monthly: 0,
    },
    "O`": {
      "1": 291,
      "5": 562,
      "7": 501,
      "10": 233,
      "15": 295,
      "20": 794,
      "30": 7102,
      "90": 75,
      "180": 27,
      "365": 1,
      Monthly: 940,
    },
    "O`M": {
      "1": 224,
      "5": 321,
      "7": 228,
      "10": 101,
      "15": 160,
      "20": 325,
      "30": 4163,
      "90": 38,
      "180": 20,
      "365": 6,
      Monthly: 588,
    },
    T: {
      "1": 2312,
      "5": 2386,
      "7": 1604,
      "10": 601,
      "15": 565,
      "20": 753,
      "30": 8273,
      "90": 38,
      "180": 28,
      "365": 7,
      Monthly: 901,
    },
    TM: {
      "1": 3360,
      "5": 4473,
      "7": 2370,
      "10": 1103,
      "15": 1071,
      "20": 966,
      "30": 14868,
      "90": 76,
      "180": 23,
      "365": 10,
      Monthly: 1384,
    },
    AVY: {
      "30": 0,
    },
    "O`Y": {
      "30": 0,
    },
    NY: {
      "30": 0,
    },
    AVS: {
      "1": 0,
      "5": 0,
      "7": 0,
      "10": 0,
      "15": 0,
      "20": 0,
      "30": 0,
      "90": 0,
      "180": 0,
      "365": 0,
    },
    AVT: {
      "1": 0,
      "5": 0,
      "7": 0,
      "10": 0,
      "15": 0,
      "20": 0,
      "30": 0,
      "90": 0,
      "180": 0,
      "365": 0,
    },
    NS: {
      "1": 0,
      "5": 0,
      "7": 0,
      "10": 0,
      "15": 0,
      "20": 0,
      "30": 0,
      "90": 0,
      "180": 0,
      "365": 0,
    },
    NT: {
      "1": 0,
      "5": 0,
      "7": 0,
      "10": 0,
      "15": 0,
      "20": 0,
      "30": 0,
      "90": 0,
      "180": 0,
      "365": 0,
    },
    "O`S": {
      "1": 0,
      "5": 0,
      "7": 0,
      "10": 0,
      "15": 0,
      "20": 0,
      "30": 0,
      "90": 0,
      "180": 0,
      "365": 0,
    },
    "O`T": {
      "1": 0,
      "5": 0,
      "7": 0,
      "10": 0,
      "15": 0,
      "20": 0,
      "30": 0,
      "90": 0,
      "180": 0,
      "365": 0,
    },
    TS: {
      "1": 0,
      "5": 0,
      "7": 1,
      "10": 0,
      "15": 0,
      "20": 0,
      "30": 0,
      "90": 0,
      "180": 0,
      "365": 0,
    },
    TT: {
      "1": 0,
      "5": 0,
      "7": 0,
      "10": 0,
      "15": 0,
      "20": 0,
      "30": 0,
      "90": 0,
      "180": 0,
      "365": 0,
    },
    AVX: {
      "1": 0,
      "5": 0,
      "10": 0,
      "15": 0,
      "20": 0,
      "30": 0,
      "90": 0,
      "180": 0,
      "365": 0,
    },
  },
};

const getData = (
  tarrif:
    | "\u041B\u044C\u0433\u043E\u0442\u043D\u044B\u0439 Mintrans"
    | "AVM"
    | "TM"
    | "O`M"
) => {
  const tariffs = Object.values(fakeData.metro[tarrif]);

  return tariffs;
};
const str = "123";
const num = 4324;
console.log(str + num);

const getTariffs = () => Object.keys(fakeData.metro.AVM);

const getOptimalData = () => {
  const bus: any = fakeData.bus;
  const arr = [];
  for (let key in bus) {
    const total: any = Object.values(bus[key]).reduce(
      (acc, curr) => acc + curr,
      0
    );
    if (total > 1) {
      arr.push({
        name: key,
        data: bus[key],
      });
    }
  }
  return arr;
};
console.log(getOptimalData());

export const Tariffs = () => {
  const { dark } = useContext(DashboardContext);
  const echartsRef = useRef<ReactEcharts | null>(null);

  useEffect(() => {
    if (echartsRef.current) {
      const chartInstance = echartsRef.current.getEchartsInstance();

      chartInstance.on("click", (evt) => {
        console.log(evt);
      });
    }
  }, []);

  return (
    <div className="mt-6">
      <div className="flex items-center gap-5 flex-col">
        <ReactEcharts
          theme={dark ? "dark" : ""}
          className="[&_div]:!w-auto [&_div]:!h-auto mb-14"
          style={{ width: "100%", height: "700px" }}
          option={
            {
              backgroundColor: "",
              title: {
                text: "Metro",
                left: 0,
              },

              tooltip: {
                trigger: "axis",

                axisPointer: {
                  // Use axis to trigger tooltip
                  type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
                },
              },
              toolbox: {
                show: true,
                feature: {
                  magicType: {
                    show: true,
                    type: ["line", "bar"],
                    onclick() {
                      console.log("click");
                    },
                  },
                  restore: { show: true },
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
                data: getTariffs(),
              },
              series: [
                {
                  name: "AVM",
                  type: "bar",
                  stack: "total",

                  emphasis: {
                    focus: "series",
                  },
                  data: getData("AVM"),
                  animationEasing: "elasticOut",
                  animationEasingUpdate: "elasticOut",
                  animationDelay: 100,
                },
                {
                  name: "O`M",
                  type: "bar",
                  stack: "total",

                  emphasis: {
                    focus: "series",
                  },
                  data: getData("O`M"),
                  animationEasing: "elasticOut",
                  animationEasingUpdate: "elasticOut",
                  animationDelay: 200,
                },
                {
                  name: "TM",
                  type: "bar",
                  stack: "total",

                  emphasis: {
                    focus: "series",
                  },
                  data: getData("TM"),
                  animationEasing: "elasticOut",
                  animationEasingUpdate: "elasticOut",
                  animationDelay: 300,
                },
                {
                  name: "Льготный Mintrans",
                  type: "bar",
                  stack: "total",

                  emphasis: {
                    focus: "series",
                  },
                  data: getData("Льготный Mintrans"),
                  animationEasing: "elasticOut",
                  animationEasingUpdate: "elasticOut",
                  animationDelay: 400,
                },
              ],
            } as EChartsOption
          }
        />

        <ReactEcharts
          theme={dark ? "dark" : ""}
          className="[&_div]:!w-auto [&_div]:!h-auto mb-14"
          style={{ width: "100%", height: "700px" }}
          option={
            {
              backgroundColor: "",
              title: {
                text: "Bus",
                left: 0,
              },

              tooltip: {
                trigger: "axis",

                axisPointer: {
                  // Use axis to trigger tooltip
                  type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
                },
              },
              toolbox: {
                show: true,
                feature: {
                  magicType: { show: true, type: ["line", "bar"] },
                  restore: { show: true },
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
                data: getTariffs(),
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
                      data: Object.values(fakeData.bus[item.name]),
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
                  data: Object.values(fakeData.bus[getOptimalData()[0].name]),
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
            legend: {
              data: ["Metro", "Bus"],
            },
            toolbox: {
              show: true,
              feature: {
                magicType: { show: true, type: ["line", "bar", "stack"] },
                restore: { show: true },
              },
            },
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
                name: "Metro",
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
                name: "Bus",
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
