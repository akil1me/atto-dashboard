import Ratings from "../../components/ratings";
import Aggreagators from "../aggreagators";
import StatisticsBus from "../bus";
import CardBin from "../card-bin";
import Regions from "../regions";
import StatisticsMetro from "../statistics-metro";
import StatisticsUsers from "../statistics-users";
import Tariffs from "../tariffs";
import Trips from "../trips";

export const AllPages = () => {
  return (
    <div className="flex flex-col gap-10">
      <Trips />
      <Tariffs />
      <div className="flex gap-10">
        <CardBin />
        <Aggreagators />
      </div>
      <Regions />
      <div className="flex  gap-10">
        <StatisticsMetro />
        <StatisticsBus />
      </div>
      <StatisticsUsers />
      <Ratings />
    </div>
  );
};
