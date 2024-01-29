import { Segmented } from "antd";
import { SegmentedValue } from "antd/es/segmented";
import { EChartsOption } from "echarts";
import ReactEcharts from "echarts-for-react";
import { useRef, useState } from "react";
import { Title } from "../../components";
import { useChangeColor } from "../../hooks";
import { busData } from "../../json";

const dataChanger = (val: "amount" | "count") => {
  return busData.bus.children.map((item) => {
    return {
      name: item.name,
      children: item.children.map((child) => {
        return {
          name: child.name,
          children: child.children.map((child2) => {
            return {
              name: child2.name,
              value: val === "amount" ? child2.paidAmount : child2.paidCount,
            };
          }),
        };
      }),
    };
  });
};

export const StatisticsBus = () => {
  const echartsRef = useRef<ReactEcharts | null>(null);
  const [segment, setSegment] = useState<"count" | "amount">("count");
  const treeColor = useChangeColor();

  const handleChange = (values: SegmentedValue) => {
    const val = values as "count" | "amount";
    setSegment(val);
    if (echartsRef.current) {
      const chart = echartsRef.current.getEchartsInstance();

      chart.setOption({
        series: [
          {
            data: dataChanger(val),
          },
        ],
      } as EChartsOption);
    }
  };

  const opts = {
    backgroundColor: "transparent",

    tooltip: {},
    legend: {
      show: true,
      data: ["232", "23432"],
      selectedMode: "single",
      top: 55,
      itemGap: 5,
      borderRadius: 5,
    },

    series: [
      {
        name: "Автобус",
        type: "treemap",
        roam: false,
        zoomToNodeRatio: 1.2,
        zoom: 10,
        data: dataChanger("count"),
        leafDepth: 1,
        levels: [
          {
            itemStyle: {
              borderColor: treeColor,
              borderWidth: 2,
              borderRadius: 7,
              gapWidth: 2,
            },
          },
          {
            colorSaturation: [0.3, 0.6],
            itemStyle: {
              borderColorSaturation: 0.7,
              gapWidth: 2,
              borderRadius: 7,

              borderWidth: 2,
            },
          },
          {
            colorSaturation: [0.3, 0.5],
            itemStyle: {
              borderColorSaturation: 0.6,
              borderRadius: 7,

              gapWidth: 1,
            },
          },
          {
            colorSaturation: [0.3, 0.5],
          },
        ],
      },
    ],
  } as EChartsOption;

  return (
    <div className="w-full">
      <div className="my-4 flex justify-between items-center">
        <Title>
          Транзакции автобусов по {segment === "count" ? "количеству" : "сумме"}
        </Title>
        <Segmented
          onChange={handleChange}
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
        ref={echartsRef}
        className="!w-full !h-[500px] md:!h-[600px] xl:!h-[700px] 2xl:!h-[750px]"
        // style={{ width: "100%", height: "700px" }}
        option={opts}
      />
    </div>
  );
};
