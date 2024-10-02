import React from "react";
import "./styles.css";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateEntry() {
  const [createdAt, setCreatedAt] = useState(moment().valueOf());
  const [productName, setProductName] = useState("");
  const [calorieValue, setCalorieValue] = useState(0);

  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
    console.log("Entry Created");
  };

  const newEntry = {
    createdAt: createdAt,
    productName: productName,
    calorieValue: calorieValue,
    userId: "user-id-1",
  };

  async function createEntry() {
    try {
      const response = await fetch("http://localhost:3001/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer usr-token-1",
        },
        body: JSON.stringify(newEntry),
      });

      const data = await response.json();
      console.log("New entry created:", data);
    } catch (error) {
      console.error("Failed to create entry:", error);
    }
  }

  return (
    <div className="meal-screen">
      <div className="app-header">
        <div className="food-icon">
          <img src="nutrition.png" alt="nutrition"></img>
        </div>
        <span className="title">Add new food entry</span>
      </div>
      <div className="form">
        <span style={{ color: "black", fontSize: "14px" }}>
          Add new food entry
        </span>
        <span>WHEN?</span>
        <DatePicker
          selected={createdAt}
          onChange={(date) => setCreatedAt(moment(date).valueOf())}
          dateFormat="dd/MM/yyyy"
        />
        <span>WHAT?</span>
        <div className="section">
          <div className="label">
            <label>Product Name</label>
          </div>
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          ></input>
        </div>
        <span>HOW MUCH?</span>

        <div className="section">
          <div className="label">
            <label>Number of calories</label>
          </div>

          <input
            value={calorieValue}
            onChange={(e) => setCalorieValue(e.target.value)}
            onBlur={() => {
              goToHome();
              createEntry();
            }}
          ></input>
        </div>
      </div>
    </div>
  );
}
