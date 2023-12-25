import { ChartHead } from "../chart-head/ChartHead";
import "./Card.scss";
import ReactApexChart from "react-apexcharts";

const data = [
  {
    title: "Open berth",
    amount: "2,000",
  },
  {
    title: "Occupaid berth",
    amount: "1605",
  },
  {
    title: "Attendance ",
    amount: "145/150",
  },
  {
    title: "Parking times",
    amount: "2340",
  },
];

const dataRadial = [53, 32, 25, 85];

export const Card = () => {
  return (
    <div className="w-full h-full">
      <ChartHead title="Service data" />
      <div className="card-cell flex flex-col shadow-sm">
        <ul className="py-1 px-3">
          {data.map(({ amount, title }) => {
            return (
              <li
                className="flex items-center justify-between py-1 "
                key={title}
              >
                <div className="text-sm text-[var(--cardtext)]">{title}</div>
                <div>{amount}</div>
              </li>
            );
          })}
        </ul>
        <div className="flex justify-between">
          {dataRadial.map((seria, index) => (
            <ReactApexChart
              key={index}
              width={"auto"}
              series={[seria]}
              height={120}
              options={{
                chart: {
                  height: 120,
                  type: "radialBar",
                },
                plotOptions: {
                  radialBar: {
                    hollow: {
                      size: "50%",
                    },
                    dataLabels: {
                      name: {
                        show: false,
                      },
                      value: {
                        show: true,
                        offsetY: 5,
                        color: "var(--clbody)",
                        fontSize: "17px",
                      },
                    },
                  },
                },
                labels: ["70"],
              }}
              type="radialBar"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
