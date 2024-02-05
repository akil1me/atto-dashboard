import { Segmented } from "antd";
import { SegmentedValue } from "antd/es/segmented";
import { EChartsOption } from "echarts";
import ReactEcharts from "echarts-for-react";
import { useMemo, useRef, useState } from "react";
import { Title } from "../../components";
import { useChangeColor } from "../../hooks";
import { busData } from "../../json";
import { BarChart, Network } from "lucide-react";
import { SegmentedCount } from "../../components/ui/segmented-count";
import { useTranslation } from "react-i18next";

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
// console.log(busData.bus.children.map((item) => item.name));

export const StatisticsBus = () => {
  const echartsRef = useRef<ReactEcharts | null>(null);
  const [segment, setSegment] = useState<"count" | "amount">("count");
  const [chartType, setChartType] = useState<"tree" | "bar">("tree");
  const { t } = useTranslation();
  const treeColor = useChangeColor();

  const handleChange = (values: SegmentedValue) => {
    const val = values as "count" | "amount";
    setSegment(val);
    // if (echartsRef.current) {
    //   const chart = echartsRef.current.getEchartsInstance();

    //   chart.setOption({
    //     series: [
    //       {
    //         data: dataChanger(val),
    //       },
    //     ],
    //   } as EChartsOption);
    // }
  };

  const barOpts = {
    backgroundColor: "transparent",
    tooltip: {
      show: true,
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },

    xAxis: [
      {
        type: "value",
        show: true,
      },
    ],
    yAxis: [
      {
        type: "category",
        show: true,
        axisLabel: {
          show: true,
          fontSize: 11,
        },
        axisTick: { show: false },

        data: busData.bus.children.map((item) => item.name),
      },
    ],

    universalTransition: true,

    series: [
      {
        id: "treebar",
        type: "bar",
        name: busData.bus.children.map((item) => item.name),
        showBackground: true,
        data: busData.bus.children.map((item) =>
          segment === "count" ? item.paidCount : item.paidAmount
        ),
        universalTransition: true,
        animationDelay: function (idx) {
          return idx * 10;
        },
        animationDelayUpdate: function (idx) {
          return idx * 5;
        },
        itemStyle: {
          borderRadius: [0, 20, 20, 0],
        },
      },
    ],
    animationEasing: "elasticOut",

    animationDelayUpdate: function (idx) {
      return idx * 5;
    },
  } as EChartsOption;

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
    universalTransition: true,
    series: [
      {
        name: "Автобус",
        id: "treebar",
        type: "treemap",
        roam: false,
        zoomToNodeRatio: 1.2,
        zoom: 10,
        data: dataChanger(segment),
        universalTransition: true,
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

  const handleChangeChart = (e: SegmentedValue) => {
    setChartType(e as "tree" | "bar");
  };

  const option: echarts.EChartsOption = useMemo(
    () => (chartType === "tree" ? opts : barOpts),
    [chartType, segment]
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-between my-4">
        <Title>{t("statistics.bus.title")}</Title>

        <div className="flex items-center gap-3">
          <Segmented
            value={chartType}
            onChange={handleChangeChart}
            options={[
              {
                label: (
                  <div className="flex items-center gap-3">
                    <Network size={20} strokeWidth={1} />
                  </div>
                ),
                value: "tree",
              },
              {
                label: (
                  <div className="relative flex items-center gap-3">
                    <BarChart size={20} strokeWidth={1} />
                  </div>
                ),
                value: "bar",
              },
            ]}
          />

          <SegmentedCount setSegment={setSegment} />
        </div>
      </div>
      <ReactEcharts
        ref={echartsRef}
        notMerge
        className="!w-full !h-[500px] md:!h-[600px] xl:!h-[700px] 2xl:!h-[750px]"
        // style={{ width: "100%", height: "700px" }}
        option={option}
      />
    </div>
  );
};
