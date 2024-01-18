import { Segmented, Tabs } from "antd";
import { EChartsOption } from "echarts";
import { AlignCenter, BusFront, TrainFrontTunnel } from "lucide-react";
import ReactEcharts from "echarts-for-react";
import { useContext, useState } from "react";
import { DashboardContext } from "../../layout";

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

export const CardBin = () => {
  const { dark } = useContext(DashboardContext);
  const [segment, setSegment] = useState<"conut" | "amount">("conut");

  return (
    <div className="py-4 px-4">
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
          onChange={(e) => setSegment(e as "conut" | "amount")}
          options={[
            {
              label: "Conut",
              value: "conut",
            },
            {
              label: "Amount",
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
            legend: {
              data: ["Paid " + segment, "Not Paid " + segment],
            },
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
                name: "Paid " + segment,
                type: "bar",
                stack: "Total",
                label: {
                  show: true,
                  formatter: segment === "amount" ? "{c} sum" : "{c}",
                },
                emphasis: {
                  focus: "series",
                },
                data: [320, 302, 341, 374, 390, 450, 420].map((item) => {
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
                name: "Not Paid " + segment,
                type: "bar",
                stack: "Total",
                label: {
                  show: true,
                  color: "#fff",
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
                data: [-120, -132, -101, -134, -190, -230, -210].map((item) => {
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
