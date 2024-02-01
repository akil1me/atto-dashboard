import { BusFront, Grid, TrainFrontTunnel } from "lucide-react";

export const tabItems = [
  {
    text: "Общий",
    icon: (
      <div className="inline-block align-top">
        <Grid />
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
