import { Tabs } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";
import { AlignCenter, BusFront, TrainFrontTunnel } from "lucide-react";
import { useContext } from "react";
import { BsCashCoin, BsCreditCard2Back } from "react-icons/bs";
import { PiDatabaseLight } from "react-icons/pi";
import { TbLetterH, TbLetterU } from "react-icons/tb";
import { DashboardContext } from "../../layout";

interface DataType {
  key: React.Key;
  name: string | React.ReactNode;
  chinese: number;
  math: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Type of payment",
    dataIndex: "name",
  },
  {
    title: "Pass count",
    dataIndex: "chinese",
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: "Total amount ",
    dataIndex: "math",
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: (
      <div className="flex items-center gap-3">
        <BsCreditCard2Back />
        <span>Transport card</span>
      </div>
    ),
    chinese: 98,
    math: 60,
  },
  {
    key: "2",
    name: (
      <div className="flex items-center gap-3">
        <TbLetterU />
        <span>Uzcard</span>
      </div>
    ),
    chinese: 98,
    math: 66,
  },
  {
    key: "3",
    name: (
      <div className="flex items-center gap-3">
        <TbLetterH />
        <span>Humo</span>
      </div>
    ),
    chinese: 98,
    math: 90,
  },
  {
    key: "4",
    name: (
      <div className="flex items-center gap-3">
        <BsCashCoin />
        <span>Cash</span>
      </div>
    ),
    chinese: 98,
    math: 90,
  },
  {
    key: "5",
    name: (
      <div className="flex items-center gap-3">
        <PiDatabaseLight />
        <span>Total</span>
      </div>
    ),
    chinese: 88,
    math: 99,
  },
];

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const items = [
  {
    text: "All",
    icon: (
      <div className="inline-block align-top">
        <AlignCenter />
      </div>
    ),
  },
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

export const Trips = () => {
  const { dark } = useContext(DashboardContext);
  return (
    <div className="mt-6 px-4">
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

      <ReactEcharts
        theme={dark ? "dark" : ""}
        className="[&_div]:!w-auto [&_div]:!h-auto"
        style={{ width: "100%", height: "700px" }}
        option={
          {
            backgroundColor: "",

            legend: {},
            tooltip: {
              trigger: "axis",
              showContent: true,
              transitionDuration: 1.5,
            },
            dataset: {
              source: [
                ["product", "2012", "2013", "2014", "2015", "2016", "2017"],
                ["Total", 156.5, 182.1, 108.7, 100.1, 153.4, 185.1],
                ["Transport card", 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
                ["Uzcard", 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
                ["Humo", 25.2, 37.1, 41.2, 18, 33.9, 49.1],
                ["Сash", 35.2, 37.1, 61.2, 48, 63.9, 99.1],
              ],
            },
            xAxis: { type: "category", offset: 10, boundaryGap: false },
            yAxis: {
              type: "value",
              gridIndex: 0,

              axisLine: {
                show: true,
              },
            },
            animationDuration: 4000,
            grid: { top: "50%", containLabel: true },
            series: [
              {
                type: "line",
                smooth: true,

                seriesLayoutBy: "row",
                emphasis: { focus: "series" },
                symbol: "circle",
                animationEasing: "quadraticIn",
                markLine: {},
                stack: "Total",
                areaStyle: {},
              },
              {
                type: "line",
                smooth: true,
                seriesLayoutBy: "row",
                emphasis: { focus: "series" },
                symbol: "circle",
                animationEasing: "quadraticIn",
                stack: "Total",
                areaStyle: {},
              },
              {
                type: "line",
                smooth: true,
                seriesLayoutBy: "row",
                emphasis: { focus: "series" },
                symbol: "circle",
                animationEasing: "quadraticIn",
                stack: "Total",
                areaStyle: {},
              },
              {
                type: "line",
                smooth: true,
                seriesLayoutBy: "row",
                emphasis: { focus: "series" },
                symbol: "circle",
                animationEasing: "quadraticIn",
                stack: "Total",
                areaStyle: {},
              },
              {
                type: "line",
                smooth: true,
                seriesLayoutBy: "row",
                emphasis: { focus: "series" },
                symbol: "circle",
                animationEasing: "quadraticIn",
                stack: "Total",
                areaStyle: {},
                label: {
                  show: true,
                  position: "top",
                },
              },
              {
                type: "pie",
                id: "pie",

                center: ["50%", "25%"],
                radius: ["20%", "30%"],

                emphasis: {
                  label: {
                    show: true,
                    fontSize: 24,
                    fontWeight: "bold",
                  },
                  focus: "self",
                },
                itemStyle: {
                  borderRadius: 5,
                  borderColor: "#fff",
                  borderWidth: 2,
                },
                label: {
                  formatter: "{b}: {@2012} ({d}%)",
                },
                encode: {
                  itemName: "product",
                  value: "2012",
                  tooltip: "2012",
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
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4 text-right">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Microsoft Surface Pro
              </th>
              <td className="px-6 py-4">White</td>
              <td className="px-6 py-4">Laptop PC</td>
              <td className="px-6 py-4">$1999</td>
              <td className="px-6 py-4 text-right">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Magic Mouse 2
              </th>
              <td className="px-6 py-4">Black</td>
              <td className="px-6 py-4">Accessories</td>
              <td className="px-6 py-4">$99</td>
              <td className="px-6 py-4 text-right">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
