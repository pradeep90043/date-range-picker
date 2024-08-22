import React from "react";
import WeekDateRangePicker from "./Components/WeekDateRangePicker";
import "./App.css";

const App: React.FC = () => {
  const predefinedRanges = [
    7,30
  ];

  const handleDateRangeChange = (
    selectedRange: { startDate: string; endDate: string },
    weekendDates: string[]
  ) => {
    console.log("Selected Date Range:", selectedRange);
    console.log("Weekend Dates in Range:", weekendDates);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Weekday Date Range Picker Example</h1>
      <WeekDateRangePicker
      predefinedRanges={predefinedRanges}
      onChange={handleDateRangeChange}
      />
    </div>
  );
};

export default App;
