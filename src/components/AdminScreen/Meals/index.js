import React from "react";
import "../Meals/styles.css";
import moment from "moment";

export default function Meals({ name, calories, date, user }) {
  const time = new Date() - date;
  const hours = Math.floor(time / (1000 * 60 * 60));
  return (
    <div className="meal-container">
      <div>
        <span style={{ color: "black" }}>{name}</span>
        <div className="time-wrapper">
          <img src="clock.png" alt="clock" />
          <span>{hours} hours ago</span>
        </div>
        <span style={{ color: " rgb(75, 180, 68)", fontSize: "12px" }}>
          {user}
        </span>
      </div>

      <div className="calories-wrapper">
        <span>{calories}</span>
        <span style={{ fontSize: "12px" }}>kcal</span>
      </div>
    </div>
  );
}
