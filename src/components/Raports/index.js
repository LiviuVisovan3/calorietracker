import React from "react";
import "./styles.css";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

async function getAllEntries() {
  try {
    const response = await fetch("http://localhost:3001/api/entries", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer usr-token-2",
      },
    });

    const data = await response.json();
    console.log("New entry created:", data);
    return data;
  } catch (error) {
    console.error("Failed to create entry:", error);
  }
}

export default function Raports() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await getAllEntries();
      setEntries(result);
    };

    getData();
  }, []);

  const navigate = useNavigate();

  function filterNames(array) {
    const newarray = array
      .filter(
        (entry, index) =>
          index ===
          array.findIndex((e) => e.userFullName === entry.userFullName)
      )
      .map((x) => x.userFullName);
    return newarray;
  }

  const goToHome = () => {
    navigate("/");
    console.log("Entry Created");
  };
  console.log(entries);

  let totalCalories;
  let numberOfEntries = 0;

  return (
    <div className="meal-screen">
      <div className="app-header">
        <div className="food-icon">
          <img src="nutrition.png" alt="nutrition"></img>
        </div>
        <span className="title">Raports</span>
      </div>
      <div className="history">
        {" "}
        <div className="section">
          <p>Entries</p>
          <div style={{ display: "flex", gap: "4px" }}>
            <span>
              Last 3 days({moment().subtract(3, "days").format("DD MMM")} -{" "}
              {moment().format("DD MMM")})
            </span>
            <span style={{ fontWeight: 500 }}>
              -{" "}
              {
                entries.filter(
                  (x) => x.createdAt > moment().subtract(3, "days").valueOf()
                ).length
              }{" "}
              food entries
            </span>
          </div>
          <div style={{ display: "flex", gap: "4px" }}>
            <span>
              Before({moment().subtract(14, "days").format("DD MMM")} -{" "}
              {moment().subtract(3, "days").format("DD MMM")})
            </span>
            <span style={{ fontWeight: 500 }}>
              -{" "}
              {
                entries.filter(
                  (x) => x.createdAt < moment().subtract(3, "days").valueOf()
                ).length
              }{" "}
              food entries
            </span>
          </div>
        </div>
        <div className="section">
          <p>Average Calories last 7 days</p>

          {filterNames(entries).map((x) => {
            totalCalories = entries.reduce((acc, value) => {
              if (x === value.userFullName) {
                return (acc += value.calorieValue);
              } else return acc;
            }, 0);
            return (
              <div style={{ display: "flex", gap: "8px" }}>
                <span>{x}</span>

                <span style={{ fontWeight: 500 }}>
                  - {Math.round(totalCalories / 7)} kcal
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
