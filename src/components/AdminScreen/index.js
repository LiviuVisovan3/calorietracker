import React from "react";
import "../AdminScreen/styles.css";
import moment from "moment";
import Meals from "./Meals";
import { useState, useEffect } from "react";
import FilterModal from "./FilterModal";
import { useNavigate } from "react-router-dom";

const foodEntries1 = [
  {
    name: "Chicken Teriyaki",
    calories: 800,
    timeLogged: "5 hours ago",
    statusIcon: "checkmark",
    user: "John Doe",
  },
  {
    name: "Ravioli with Mustard",
    calories: 100,
    timeLogged: "5 hours ago",
    statusIcon: "checkmark",
    user: "Johnny Doe",
  },
  {
    name: "Fresh Milk",
    calories: 115,
    timeLogged: "a day ago",
    statusIcon: "checkmark",
    user: "John Doe",
  },
  {
    name: "Vegetables 2",
    calories: 725,
    timeLogged: "a day ago",
    statusIcon: "checkmark",
    user: "John Doe",
  },
  {
    name: "Pizza",
    calories: 1050,
    timeLogged: "2 days ago",
    statusIcon: "plus",
    user: "John Doe",
  },
];

async function getEntries() {
  try {
    const response = await fetch("http://localhost:3001/api/entries", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer usr-token-2",
      },
    });

    const data = await response.json();
    console.log("New DATA:", data);
    return data;
  } catch (error) {
    console.error("Failed to create entry:", error);
  }
}

export default function AdminScreen() {
  const [foodEntries, setFoodEntries] = useState(foodEntries1);

  const navigate = useNavigate();

  const goToRaports = () => {
    navigate("/raports");
  };

  const [filters, setFilters] = useState({
    startDate: 0,
    endDate: 0,
    isDone: false,
  });

  const handleFiltering = () => {
    const filteredList = foodEntries.filter(
      (x) => x.createdAt >= filters.startDate && x.createdAt <= filters.endDate
    );
    setFoodEntries(filteredList);
  };

  const updateFilters = (updatedData) => {
    setFilters(updatedData);
  };

  useEffect(() => {
    handleFiltering();
  }, [filters.startDate]);

  useEffect(() => {
    const getData = async () => {
      const result = await getEntries();
      setFoodEntries(result);
    };

    getData();
  }, []);

  console.log(foodEntries);

  return (
    <div className="home-screen">
      <div className="app-header">
        <div className="food-icon">
          <img src="nutrition.png" alt="nutrition"></img>
        </div>
        <span className="title">Calorie Tracker - Admin</span>
      </div>

      <div className="meals-entries">
        <div className="raports" onClick={goToRaports}>
          RAPORTS
        </div>
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
        {foodEntries.map((x) => (
          <Meals
            name={x.productName}
            calories={x.calorieValue}
            date={x.createdAt}
            user={x.userFullName}
          />
        ))}
      </div>
      {filters.isDone && (
        <FilterModal filterValues={updateFilters}></FilterModal>
      )}
    </div>
  );
}
