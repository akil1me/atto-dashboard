import { Segmented, Select } from "antd";
import { SegmentedValue } from "antd/es/segmented";
import ReactEcharts from "echarts-for-react";
import { BarChart, Network } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { DateRange, Title } from "../../components";
import { SegmentedCount } from "../../components/ui/segmented-count";
import { useChangeColor } from "../../hooks";
import { dataChanger, getBarOpts, getTreeOpts } from "./bus-opts";

export const StatisticsBus = () => {
  const echartsRef = useRef<ReactEcharts | null>(null);
  const [segment, setSegment] = useState<"count" | "amount">("count");
  const [chartType, setChartType] = useState<"tree" | "bar">("tree");
  const { t } = useTranslation();
  const [parkValue, setParkValue] = useState<string>();
  const [routeValue, setRouteValue] = useState<string | null>();
  const [busValue, setBusValue] = useState<string | null>();
  const treeColor = useChangeColor();
  const selectOpts = dataChanger(segment);

  const barOpts = getBarOpts(segment);

  const opts = getTreeOpts(segment, treeColor);

  const handleChangeParkValue = (value: string) => {
    setParkValue(value);
    setBusValue(null);
    setRouteValue(null);
  };

  const handleChangeRouteValue = (value: string) => {
    setRouteValue(value);
    setBusValue(null);
  };

  const handleChangeChart = (e: SegmentedValue) => {
    setChartType(e as "tree" | "bar");
  };
  const option = useMemo(
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
          <DateRange
            showFilter
            filters={
              <div className="flex flex-col items-center gap-4">
                <Select
                  showSearch
                  value={parkValue}
                  onChange={handleChangeParkValue}
                  className="w-full"
                  options={selectOpts.map((opt) => {
                    return { label: opt.name, value: opt.name };
                  })}
                  placeholder="Avtosaroy tanlang"
                />

                <Select
                  showSearch
                  value={routeValue}
                  onChange={handleChangeRouteValue}
                  className="w-full"
                  disabled={!parkValue}
                  options={[...selectOpts]
                    .sort()
                    .find((opt) => opt.name === parkValue)
                    ?.children.map((route) => {
                      return { label: route.name, value: route.name };
                    })}
                  placeholder="Mashrutni tanlang"
                />

                <Select
                  showSearch
                  className="w-full"
                  value={busValue}
                  onChange={(value) => setBusValue(value)}
                  disabled={!parkValue || !routeValue}
                  options={selectOpts
                    .find((opt) => opt.name === parkValue)
                    ?.children.find((route) => route.name === routeValue)
                    ?.children.map((bus) => {
                      return { label: bus.name, value: bus.name };
                    })}
                  placeholder="Abtobusni tanlang"
                />
              </div>
            }
          />
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
