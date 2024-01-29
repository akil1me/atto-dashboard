import { Segmented, Tabs } from "antd";
import { EChartsOption } from "echarts";
import { AlignCenter, BusFront, TrainFrontTunnel } from "lucide-react";
import ReactEcharts from "echarts-for-react";
import { useContext, useState } from "react";
import { DashboardContext } from "../../layout";
import { Title } from "../../components";

const items = [
  {
    text: "Общий",
    icon: (
      <div className="inline-block align-top">
        <TrainFrontTunnel />
      </div>
    ),
    value: "all",
  },
  {
    text: "Метро",
    icon: (
      <div className="inline-block align-top">
        <TrainFrontTunnel />
      </div>
    ),
    value: "metro",
  },
  {
    text: "Автобус",
    icon: (
      <div className="inline-block align-top">
        <BusFront />
      </div>
    ),
    value: "bus",
  },
];

export const CardBin = () => {
  const { dark } = useContext(DashboardContext);
  const [segment, setSegment] = useState<"count" | "amount">("count");

  return (
    <div className="py-4 px-4 w-full">
      <Title>Диаграмма по бинам</Title>
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

              // icon: item.icon,
            };
          })}
        />
        <Segmented
          onChange={(e) => setSegment(e as "count" | "amount")}
          options={[
            {
              label: "Количество",
              value: "count",
            },
            {
              label: "Сумма",
              value: "amount",
            },
          ]}
        />
      </div>

      <ReactEcharts
        theme={dark ? "dark" : ""}
        className="[&_div]:!w-auto [&_div]:!h-auto mb-14"
        style={{ width: "100%", height: "700px" }}
        option={
          {
            backgroundColor: "transparent",
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow",
              },
            },
            legend: {},
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true,
            },
            xAxis: [
              {
                type: "value",
              },
            ],
            yAxis: [
              {
                type: "category",
                axisTick: {
                  show: false,
                },
                data: [
                  "Humo",
                  "Mastercard",
                  "UnionPay",
                  "UnionPay Kobeyd",
                  "Uzcard",
                  "Visa",
                  "Visa Humans",
                ],
              },
            ],
            series: [
              {
                name: "Оплачено",
                type: "bar",
                stack: "Total",
                label: {
                  show: true,
                  formatter: segment === "amount" ? "{c} sum" : "{c}",
                },
                emphasis: {
                  focus: "series",
                },
                data: [10040, 757, 1823, 2680, 1792, 5702, 420].map((item) => {
                  if (segment === "amount") {
                    return item * 1700;
                  }
                  return item;
                }),
                barWidth: 50,
                itemStyle: {
                  color: "#27AE60FF",
                },
                animationDelay(idx) {
                  return +((idx + 1).toString() + "00");
                },
                animationEasing: "elasticOut",
                animationEasingUpdate: "elasticOut",
              },
              {
                name: "Не оплачено",
                type: "bar",
                stack: "Total",
                label: {
                  show: true,
                  position: "outside",
                  formatter: segment === "amount" ? "{c} sum" : "{c}",
                },
                emphasis: {
                  focus: "series",
                },
                animationEasing: "elasticOut",
                animationEasingUpdate: "elasticOut",
                animationDelay(idx) {
                  return +((idx + 1).toString() + "00");
                },
                barWidth: 50,
                itemStyle: {
                  color: "#EE6666FF",
                },

                data: [-428, -50, -100, -124, -11, -85, -210].map((item) => {
                  if (segment === "amount") {
                    return item * 1700;
                  }
                  return item;
                }),
              },
            ],
          } as EChartsOption
        }
      />
    </div>
  );
};
