import { Card } from "../../components";

export const Home = () => {
  return (
    <div className="mt-5 grid grid-cols-3 gap-8">
      <Card />
      <Card />
      <Card />
      <Card />
      <div className="row-span-3">
        <Card />
      </div>
      <Card />
      <Card />
      <Card />
    </div>
  );
};
