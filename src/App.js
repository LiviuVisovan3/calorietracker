import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import HomeScreen from "./components/HomeScreen/index";
import CreateEntry from "./components/CreateEntry";
import AdminScreen from "./components/AdminScreen";
import EditEntry from "./components/EditEntry";
import Raports from "./components/Raports";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" key={Math.random()} exact element={<HomeScreen />} />
        <Route path="/admin" element={<AdminScreen />} />
        <Route path="/entries" key={Math.random()} element={<CreateEntry />} />
        <Route path="/raports" key={Math.random()} element={<Raports />} />
        <Route
          path="/editentries/:id"
          key={Math.random()}
          element={<EditEntry />}
        />
      </Routes>
    </Router>
  );
}

export default App;
