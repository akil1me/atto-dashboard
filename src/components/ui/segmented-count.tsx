import { Segmented } from "antd";

export const SegmentedCount = ({
  setSegment,
}: {
  setSegment: React.Dispatch<React.SetStateAction<"count" | "amount">>;
}) => {
  return (
    <Segmented
      onChange={(e) => setSegment(e as "count" | "amount")}
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
  );
};
