import ReactEcharts from "echarts-for-react";
import { EChartsOption } from "echarts";
import { useContext } from "react";
import { DashboardContext } from "../../layout";
import { stations } from "../../json/stations";

export const StatisticsMetro = () => {
  const { dark } = useContext(DashboardContext);
  return (
    <div>
      <ReactEcharts
        theme={dark ? "dark" : ""}
        className="[&_div]:!w-auto [&_div]:!h-auto mb-14"
        style={{ width: "100%", height: "700px" }}
        option={
          {
            backgroundColor: "transparent",
            tooltip: {},
            legend: {},

            series: {
              type: "sunburst",
              levels: [
                {
                  r0: "15%",
                  r: "35%",
                  itemStyle: {
                    borderWidth: 2,
                  },
                  label: {
                    rotate: "tangential",
                  },
                },
                {
                  r0: "35%",
                  r: "70%",
                  label: {
                    align: "center",
                  },
                },
                {
                  r0: "70%",
                  r: "72%",
                  label: {
                    position: "outside",
                    padding: 3,
                    silent: false,
                  },
                  itemStyle: {
                    borderWidth: 3,
                  },
                },
              ],
              data: stations.map((station) => {
                return {
                  name: station.name,

                  children: station.stations.map((childStation, i) => {
                    return {
                      name: childStation.name,
                      value: Math.floor(Math.random() * 100),
                    };
                  }),
                };
              }),
              // data: [
              //   {
              //     name: "Bob",
              //     children: [
              //       {
              //         name: "Uncle Nike",
              //         children: [
              //           {
              //             name: "Cousin Betty",
              //             value: 1,
              //           },
              //           {
              //             name: "Cousin Jenny",
              //             value: 2,
              //           },
              //         ],
              //       },
              //     ],
              //   },
              //   {
              //     name: "Nancy",
              //     children: [
              //       {
              //         name: "Uncle Nike",
              //         children: [
              //           {
              //             name: "Cousin Betty",
              //             value: 1,
              //           },
              //           {
              //             name: "Cousin Jenny",
              //             value: 2,
              //           },
              //         ],
              //       },
              //     ],
              //   },
              //   {
              //     name: "Lol",
              //     children: [
              //       {
              //         name: "Uncle Nike",
              //         children: [
              //           {
              //             name: "Cousin Betty",
              //             value: 1,
              //           },
              //           {
              //             name: "Cousin Jenny",
              //             value: 2,
              //           },
              //         ],
              //       },
              //     ],
              //   },
              //   {
              //     name: "Lol2",
              //     children: [
              //       {
              //         name: "Uncle Nike",
              //         children: [
              //           {
              //             name: "Cousin Betty",
              //             value: 1,
              //           },
              //           {
              //             name: "Cousin Jenny",
              //             value: 2,
              //           },
              //         ],
              //       },
              //     ],
              //   },
              // ],
              // radius: [0, "95%"],

              // label: {
              //   rotate: "radial",
              // },
            },
          } as EChartsOption
        }
      />
    </div>
  );
};
