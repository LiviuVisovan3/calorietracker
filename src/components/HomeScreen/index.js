import React, { useEffect, useState } from "react";
import "../HomeScreen/styles.css";
import moment from "moment";
import Meals from "./Meals";
import FilterModal from "./FilterModal";

import { useNavigate } from "react-router-dom";

async function getMeals() {
  try {
    const response = await fetch("http://localhost:3001/api/entries", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer usr-token-1",
      },
    });

    const data = await response.json();
    console.log("New DATA:", data);
    return data;
  } catch (error) {
    console.error("Failed to create entry:", error);
  }
}

const getLastFiveDays = () => {
  const dates = [];

  for (let i = 0; i < 5; i++) {
    const date = moment().subtract(i, "days").valueOf();
    const day = { day: date, calories: 0 };
    dates.push(day);
  }
  return dates;
};

export default function HomeScreen() {
  const [foodList, setFoodList] = useState([]);
  const [filters, setFilters] = useState({
    startDate: 0,
    endDate: 0,
    isDone: false,
  });

  console.log(foodList, filters);

  const handleFiltering = () => {
    const filteredList = foodList.filter(
      (x) => x.createdAt >= filters.startDate && x.createdAt <= filters.endDate
    );
    setFoodList(filteredList);
  };

  const updateFilters = (updatedData) => {
    setFilters(updatedData);
  };

  useEffect(() => {
    handleFiltering();
  }, [filters.startDate]);

  useEffect(() => {
    const getData = async () => {
      const result = await getMeals();
      setFoodList(result);
    };

    getData();

    console.log("imusefaj");
  }, []);

  const navigate = useNavigate();

  const goToEntries = () => {
    navigate("/entries");
    console.log("roza");
  };
  const goToEditEntries = (id) => {
    navigate(`/editentries/${id}`);
    console.log("roza");
  };

  const dates = getLastFiveDays().reverse();

  console.log(dates);

  // dates.forEach((x) => {
  //   x.calories = foodList
  //     .filter((y) => moment(y.createdAt).date() === x.day)
  //     .reduce((acc, value) => (acc += value.calorieValue), 0);
  // });

  foodList.forEach((x) => {
    const index = dates.findIndex((y) =>
      moment(x.createdAt).isSame(moment(y.day), "day")
    );
    if (index !== -1) {
      dates[index].calories = dates[index].calories + x.calorieValue;
    }
  });

  // const testObject = {
  //   28: 0,
  //   27: 0,
  //   26: 0,
  //   25: 0,
  //   24: 0,
  // };
  // foodList.forEach((x) => {
  //   testObject[moment(x.createdAt).date()] =
  //     testObject[moment(x.createdAt).date()] + x.calorieValue;
  // });
  // console.log(testObject);

  return (
    <div className="home-screen">
      <div className="app-header">
        <div className="food-icon">
          <img src="nutrition.png" alt="nutrition"></img>
        </div>
        <span className="title">Calorie Tracker</span>
      </div>

      <div className="daily-calories">
        <div className="max-calories">2150</div>
        <div className="dot-line"></div>
        {dates.map((x, index) => (
          <div className="day-wrapper">
            {moment(dates[index].day).isSame(moment().valueOf(), "day") && (
              <div
                className="calories-left"
                style={{
                  height: `${2150 / 12 - x.calories / 12}px`,
                  bottom: x.calories / 12 + 20,
                }}
              >
                <span>{2150 - x.calories}</span>
                <span>left</span>
              </div>
            )}
            <div
              className="calorie-block"
              style={
                x.calories / 12 < 180
                  ? { height: `${x.calories / 12}px` }
                  : {
                      height: `${x.calories / 12}px`,
                      backgroundColor: "rgb(198, 0, 53)",
                    }
              }
            >
              <span>{x.calories}</span>
              <span style={{ fontSize: "12px" }}>kcal</span>
            </div>
            <div className="date">
              {!moment(dates[index].day).isSame(moment().valueOf(), "day")
                ? moment(dates[index].day).format("DD/MM")
                : "Today"}
            </div>
          </div>
        ))}
      </div>
      <div className="meals-entries">
        <div className="entries-header">
          <span>Latest entries</span>
          <div
            className="filter-wrapper"
            onClick={() => setFilters({ ...filters, isDone: true })}
          >
            <img src="calendar.png" alt="calendar"></img>
            <span>FILTER</span>
          </div>
        </div>
        {foodList.map((x) => (
          <div onClick={() => goToEditEntries(x.id)}>
            <Meals
              name={x.productName}
              calories={x.calorieValue}
              date={x.createdAt}
            />
          </div>
        ))}
      </div>
      <div className="add-button" onClick={goToEntries}>
        +
      </div>
      {filters.isDone && (
        <FilterModal filterValues={updateFilters}></FilterModal>
      )}
    </div>
  );
}
