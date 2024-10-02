import React from "react";
import "../FilterModal/styles.css";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

export default function FilterModal({ filterValues }) {
  const [startDate, setStartDate] = useState(moment().valueOf());
  const [endDate, setEndDate] = useState(moment().valueOf());

  const filterInterval = {
    startDate: startDate,
    endDate: endDate,
    isDone: false,
  };

  return (
    <div className="filter-modal">
      <p>Only show entries between these two dates:</p>
      <span>START DATE</span>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(moment(date).valueOf())}
        dateFormat="dd/MM/yyyy"
      />
      <span>END DATE</span>
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(moment(date).valueOf())}
        dateFormat="dd/MM/yyyy"
        onBlur={() => filterValues(filterInterval)}
      />
    </div>
  );
}
