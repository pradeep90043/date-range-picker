import React, { useEffect, useRef, useState } from "react";

const weekName = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027];
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

interface CalenderProp {
  calender: number;
  selectedMonth: number;
  selectedYear: number;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  otherMonth: number;
  otherYear: number;
  setOtherSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  setOtherSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  selectStartDate: any;
  setSelectedStartDate: any;
  selectEndDate: any;
  setSelectEndDate: any;
}

const Calender = ({
  calender,
  selectedMonth,
  selectedYear,
  setSelectedMonth,
  setSelectedYear,
  otherMonth,
  otherYear,
  setOtherSelectedMonth,
  setOtherSelectedYear,
  selectStartDate,
  setSelectedStartDate,
  selectEndDate,
  setSelectEndDate,
}: CalenderProp) => {
  const [yearDropdown, setYearDropdown] = useState(false);
  const [dates, setDates] = useState<(Date | null)[]>([]);

  const selectedYearRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (yearDropdown && selectedYearRef.current) {
      selectedYearRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [yearDropdown]);

  const isDisaled = (index: number) => {
    if ((index - 1) % 7 === 0 || index % 7 === 0) return true;
    return false;
  };

  const getDaysInMonth = () => {
    return new Date(selectedYear, selectedMonth + 1, 0).getDate();
  };

  const getStartDayOfMonth = () => {
    return new Date(selectedYear, selectedMonth, 1).getDay();
  };

  const generateDates = (month: number, year: number) => {
    const datesAr: (Date | null)[] = [];
    const startDate = getStartDayOfMonth();
    const endDate = getDaysInMonth();
    for (let i = 0; i < startDate; i++) {
      datesAr.push(null);
    }
    for (let i = 1; i <= endDate; i++) {
      const dateObj = new Date(year, month, i);
      datesAr.push(dateObj);
    }
    setDates(datesAr);
  };
  useEffect(() => {
    generateDates(selectedMonth, selectedYear);
  }, [selectedYear, selectedMonth]);


  const monthHandler = (year: number, month: number) => {
    bothCalenderWithSameMonth(month, year);
    setSelectedMonth(month);
    setSelectedYear(year);
    setYearDropdown(false);
  };

  const bothCalenderWithSameMonth = (month: number, year: number) => {
    if (otherMonth === month && otherYear === year) {
      if (calender === 2) {
        if (otherMonth === 0) {
          setOtherSelectedMonth(11);
          setOtherSelectedYear(otherYear - 1);
        } else {
          setOtherSelectedMonth(otherMonth - 1);
        }
      } else if (calender === 1) {
        if (otherMonth === 11) {
          setOtherSelectedMonth(0);
          setOtherSelectedYear(otherYear + 1);
        } else {
          setOtherSelectedMonth(otherMonth + 1);
        }
      }
    }
  };

  const handleMonthChange = (direction: "pre" | "next") => {
    console.log({ direction });
    let newMonth = selectedMonth + (direction === "pre" ? -1 : +1);
    let newYear = selectedYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }
    bothCalenderWithSameMonth(newMonth, newYear);
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };

  const dateHandler = (date: Date) => {
    if (date) {
      if (selectStartDate && !selectEndDate) {
        if (selectStartDate.getTime() > date.getTime()) {
          setSelectEndDate(selectStartDate);
          setSelectedStartDate(date);
        } else {
          setSelectEndDate(date);
        }
      } else if (selectStartDate && selectEndDate) {
        setSelectedStartDate(date);
        setSelectEndDate();
      } else {
        setSelectedStartDate(date);
      }
    }
  };
  const checkIfDateSelected = (date: Date | null) => {
    if (date) {
      if (
        ((selectStartDate?.getTime() <= date?.getTime() &&
          selectEndDate?.getTime() >= date?.getTime()) ||
          selectStartDate?.getTime() === date?.getTime() ||
          selectEndDate?.getTime() === date?.getTime()) &&
        date?.getDay() !== 0 &&
        date?.getDay() !== 6
      ) {
        return true;
      }
      return false;
    }
    return false;
  };

  return (
    <>
      <div className="date_picker_component">
        <div className="dropdown_wrapper">
          <header
            className="date_picker_header"
            style={
              yearDropdown
                ? {
                    justifyContent: "center",
                  }
                : {}
            }
          >
            {!yearDropdown && (
              <i
                onClick={() => handleMonthChange("pre")}
                className="arrow left"
              ></i>
            )}
            <span onClick={() => setYearDropdown(!yearDropdown)}>
              {new Date(0, selectedMonth).toLocaleString("en-US", {
                month: "short",
              })}
              ,{selectedYear}
            </span>
            {!yearDropdown && (
              <i
                onClick={() => handleMonthChange("next")}
                className="arrow right"
              ></i>
            )}
          </header>
          {yearDropdown && (
            <div className="dropdown_close">
              <div className="year_dropdown">
                {years.map((year) => {
                  return (
                    <div
                      className="year_month_row"
                      id="selectedYearRef"
                      ref={year === selectedYear ? selectedYearRef : null}
                    >
                      <span
                        className={`${
                          year === selectedYear ? "selected_date" : ""
                        }`}
                        onClick={() => setSelectedYear(year)}
                      >
                        {year}
                      </span>{" "}
                      <div className="months">
                        {months.map((month) => {
                          return (
                            <span
                              className={`${
                                month === selectedMonth && year === selectedYear
                                  ? "selected_date"
                                  : ""
                              }`}
                              key={month}
                              style={{ padding: "5px" }}
                              onClick={() => monthHandler(year, month - 1)}
                            >
                              {month}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              <i
                onClick={() => setYearDropdown(false)}
                className="arrow up"
              ></i>
            </div>
          )}
        </div>

        <main className="date_picker_body">
          <div className="days">
            {weekName.map((day, i) => {
              return <span key={day + i}>{day}</span>;
            })}
          </div>
          <div className="dates">
            {dates.map((date, i) => {
              return (
                <button
                  disabled={isDisaled(i + 1)}
                  className={`${
                    checkIfDateSelected(date) ? "selected_date" : ""
                  }`}
                  key={i}
                  onClick={() => {
                    date && dateHandler(date);
                  }}
                >
                  {date?.getDate()}
                </button>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
};

export default Calender;
