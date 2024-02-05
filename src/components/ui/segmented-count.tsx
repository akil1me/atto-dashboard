import { Segmented } from "antd";
import { useTranslation } from "react-i18next";

export const SegmentedCount = ({
  setSegment,
}: {
  setSegment: React.Dispatch<React.SetStateAction<"count" | "amount">>;
}) => {
  const { t } = useTranslation();
  return (
    <Segmented
      onChange={(e) => setSegment(e as "count" | "amount")}
      options={[
        {
          label: t("segmented.count"),
          value: "count",
        },
        {
          label: t("segmented.amount"),
          value: "amount",
        },
      ]}
    />
  );
};
