import type { TimeRangePickerProps } from "antd";
import { Button, DatePicker, Drawer, Timeline } from "antd";
import dayjs from "dayjs";
import { Search } from "lucide-react";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";

const { RangePicker } = DatePicker;

interface DateRangeProps {
  filters?: React.ReactNode;
  showFilter?: boolean;
}

const rangePresets: TimeRangePickerProps["presets"] = [
  {
    label: "Last 7 Days",
    value: [dayjs().add(-7, "d").startOf("day"), dayjs()],
  },
  {
    label: "Last 14 Days",
    value: [dayjs().add(-14, "d").startOf("day"), dayjs()],
  },
  {
    label: "Last 30 Days",
    value: [dayjs().add(-30, "d").startOf("day"), dayjs()],
  },
  {
    label: "Last 90 Days",
    value: [dayjs().add(-90, "d").startOf("day"), dayjs()],
  },
];

export const DateRange: React.FC<DateRangeProps> = ({
  filters,
  showFilter,
}) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <RangePicker
            presets={[
              {
                label: (
                  <span aria-label="Current Time to End of Day">Now ~ EOD</span>
                ),
                value: () => [dayjs().startOf("day"), dayjs().endOf("day")], // 5.8.0+ support function
              },
              ...rangePresets,
            ]}
            showTime
            format="YYYY/MM/DD HH:mm"
          />

          <Button icon={<Search size={12} />}>Поиск</Button>
        </div>

        {showFilter && (
          <Button icon={<FaFilter size={10} />} onClick={showDrawer} />
        )}
      </div>

      <Drawer
        width={500}
        closable={false}
        title="Filter"
        onClose={onClose}
        open={open}
        footer={<Button className="float-right">Применить</Button>}
      >
        <div className="flex flex-col gap-4">
          <RangePicker
            presets={[
              {
                label: (
                  <span aria-label="Current Time to End of Day">Now ~ EOD</span>
                ),
                value: () => [dayjs(), dayjs().endOf("day")], // 5.8.0+ support function
              },
              ...rangePresets,
            ]}
            showTime
            format="YYYY/MM/DD HH:mm:ss"
          />
          <div>{filters}</div>
        </div>
      </Drawer>
    </>
  );
};
