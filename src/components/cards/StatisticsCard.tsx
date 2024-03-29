import { Progress } from "antd";
import CountUp from "react-countup";

const progress = [
  {
    color: "#27AC5FFF",
    title: "Road toll",
    amout: "19820",
    percent: 90,
  },
  {
    color: "",
    title: "Off road toll",
    amout: "6010",
    percent: 20,
  },
];

const data = [
  {
    amount: "1668",
    percent: "68",
    status: true,
    title: "Charge",
  },
  {
    amount: "583",
    percent: "56",
    status: true,
    title: "Free",
  },
  {
    amount: "89",
    percent: "23",
    status: false,
    title: "Arrears",
  },
];

export const StatisticsCard = () => {
  return (
    <div className="card-cell px-5 py-2 w-full">
      <h2 className="text-[var(--statisticscolor)] text-2xl">Charges Today</h2>

      <div className="pt-2 font-bold h-16 px-8  text-4xl text-[var(--statisticscolor)] inline-block mt-2 border border-[#51ffff20]">
        <CountUp end={252830} separator="," decimal="," />
      </div>

      <div className="flex justify-between  mt-4">
        <div className="w-full max-w-[240px] flex-shrink-0 text-xs text-[var(--cardtext)]">
          {progress.map((item, index) => {
            return (
              <div className="flex flex-col gap-1 mt-1" key={index}>
                <div className="flex items-center justify-between">
                  <h3>{item.title}</h3>
                  <p className="w-10">
                    <CountUp end={+item.amout} separator=" " decimal="," />
                  </p>
                </div>
                <Progress
                  size={"small"}
                  percent={item.percent}
                  status="active"
                  strokeColor={item.color}
                  strokeWidth={3}
                  trailColor="#aaaaaa"
                  format={(percent) => (
                    <span className="text-[var(--cardtext)]">{percent}%</span>
                  )}
                />
              </div>
            );
          })}
        </div>
        {data.map((item, index) => {
          return (
            <li className="flex flex-col gap-3" key={index}>
              <div className="flex flex-col gap-1">
                <p className="text-[var(--statisticscolor)] w-16 text-2xl">
                  <CountUp end={+item.amount} separator=" " decimal="," />
                </p>
                <span
                  className={`text-xs ${
                    item.status ? "text-green" : "text-red-500"
                  }`}
                >
                  <i
                    className={`fa-solid fa-arrow-${
                      item.status ? "up" : "down"
                    } mr-1`}
                  ></i>
                  {item.percent}%
                </span>
              </div>

              <div className="text-[var(--cardtext)]">{item.title}</div>
            </li>
          );
        })}
        {/* <ul className="flex justify-between flex-1"></ul> */}
        {/* 
        <div>
          <div></div>
          <div>Charge</div>
        </div>
        <div>
          <div></div>
          <div>Charge</div>
        </div>
        <div>
          <div></div>
          <div>Charge</div>
        </div> */}
      </div>
    </div>
  );
};
