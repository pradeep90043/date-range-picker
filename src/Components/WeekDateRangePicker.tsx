import React, { useEffect, useState } from "react";
import Calender from "./Calender";

type DateRange = {
  startDate: string;
  endDate: string;
};

interface WeekdayDateRangePickerProps {
  predefinedRanges?: number[];
  onChange: (selectedRange: DateRange, weekendDates: string[]) => void;
}

const WeekDateRangePicker: React.FC<WeekdayDateRangePickerProps> = ({
  predefinedRanges = [],
  onChange,
}) => {
  const [selectStartDate, setSelectedStartDate] = useState<Date | null>();

  const [selectEndDate, setSelectEndDate] = useState<Date | null>();

  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedMonth2, setSelectedMonth2] = useState<number>(
    new Date().getMonth() + 1
  );
  const [selectedYear2, setSelectedYear2] = useState<number>(
    new Date().getFullYear()
  );

  useEffect(() => {
    if (selectStartDate && selectEndDate) {
      const weekends = getWeekends();
      onChange(
        {
          startDate: formatDate(selectStartDate),
          endDate: formatDate(selectEndDate),
        },
        weekends
      );
    }
  }, [selectEndDate]);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getLastNDays = (N: number) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - N + 1);
    startDate.setHours(0, 0, 0, 0);

    setSelectEndDate(currentDate);
    setSelectedStartDate(startDate);
  };

  const getWeekends = () => {
    const weekends: string[] = [];
    if (selectStartDate && selectEndDate) {
      const startDate = new Date(selectStartDate);
      const endDate = new Date(selectEndDate);

      while (startDate <= endDate) {
        if (startDate.getDay() === 0 || startDate.getDay() === 6) {
          weekends.push(formatDate(startDate));
        }
        startDate.setDate(startDate.getDate() + 1);
      }
    }
    return weekends;
  };

  return (
    <div className="wrapper_select_range">
      {/* {openCalender ? ( */}
      <div className="date_range_picker">
        <div className="date_picker">
          <Calender
            calender={1}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            setOtherSelectedMonth={setSelectedMonth2}
            setOtherSelectedYear={setSelectedYear2}
            otherYear={selectedYear2}
            otherMonth={selectedMonth2}
            selectStartDate={selectStartDate}
            setSelectedStartDate={setSelectedStartDate}
            selectEndDate={selectEndDate}
            setSelectEndDate={setSelectEndDate}
          />
          <Calender
            calender={2}
            selectedMonth={selectedMonth2}
            setSelectedMonth={setSelectedMonth2}
            selectedYear={selectedYear2}
            setSelectedYear={setSelectedYear2}
            otherYear={selectedYear}
            otherMonth={selectedMonth}
            setOtherSelectedMonth={setSelectedMonth}
            setOtherSelectedYear={setSelectedYear}
            selectStartDate={selectStartDate}
            setSelectedStartDate={setSelectedStartDate}
            selectEndDate={selectEndDate}
            setSelectEndDate={setSelectEndDate}
          />
        </div>
        <div className="preDefinded_dates">
          {predefinedRanges.map((range) => (
            <button onClick={() => getLastNDays(range)}>
              Last {range} days
            </button>
          ))}
        </div>
      </div>
      {/* {selectStartDate && selectEndDate && (
        <div className="show_selected_details">
          <h1>
            selected Range : [{formatDate(selectStartDate)},
            {formatDate(selectEndDate)}]
          </h1>
          <h1> selected Weekends : [{getWeekends().join(", ")}]</h1>
        </div>
      )} */}
    </div>
  );
};

export default WeekDateRangePicker;
