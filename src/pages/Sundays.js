import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import React, { useEffect, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";

function Sundays() {
  const [startDate, setStartDate] = useState(moment().subtract(7, "d").startOf());
  const [endDate, setEndDate] = useState(moment().endOf());
  const [dateResult, setDateResult] = useState("");

  useEffect(() => {
    let result = calculateSundays();
    setDateResult(result);
  }, [startDate, endDate]);

  const handleStartDateChange = (dates) => {
    console.log("dates", dates);
    setStartDate(dates);
  };

  const handleEndDateChange = (dates) => {
    console.log("dates", dates);
    setEndDate(dates);
  };

  function calculateSundays() {
    let start = moment(startDate, "DD-MM-YYYY").startOf("day");
    let end = moment(endDate, "DD-MM-YYYY").endOf("day");

    // Check if start date is in the future
    if (!start.isAfter(moment())) {
      return "Start date must be in the future";
    }

    // Check if start date is a Sunday
    if (start.day() === 0) {
      return "Start date cannot be on a Sunday";
    }

    // Optionally: Check if end date is after start date
    if (!end.isAfter(start)) {
      return "End date must be after start date";
    }
    if (start && end && end.diff(start, "years") >= 2) {
      let count = 0;
      let current = start.clone().day(0); // Set to the nearest previous or same Sunday
      while (current.isBefore(end)) {
        if (current.day() === 0 && current.date() < 28) {
          // Check if the day is Sunday and the date is before the 28th
          count += 1;
        }
        current.add(1, "day"); // Move to the next day
      }
      return count;
    } else {
      return "Dates must be at least two years apart";
    }
  }

  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <h1>{"Sunday Count"}</h1>
          </div>
          <DatePicker variant="inline" openTo="year" views={["year", "month", "date"]} value={startDate} onChange={handleStartDateChange} labelFunc={(date) => "Start: " + moment(date).format("DD-MM-YYYY")} />
          <DatePicker variant="inline" openTo="year" views={["year", "month", "date"]} value={endDate} onChange={handleEndDateChange} labelFunc={(date) => "End: " + moment(date).format("DD-MM-YYYY")} />
          {/* Output the result below the date picker */}
          <div style={{ margin: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>Number of Sundays: {dateResult}</div>
        </div>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default Sundays;
