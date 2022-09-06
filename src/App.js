import React from "react";
// import logo from "./logo.png";
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "./Card";
import Single from "./Single";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import NewSightingForm from "./Components/NewSightingForm";

export default function App() {
  const [sightings, setSightings] = useState([]);
  const getInitialData = async () => {
    let initialAPICall = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/sightings`
    );
    setSightings(initialAPICall.data);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  console.log(sightings);
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route
          exact
          path="/sightings"
          element={<Card sightings={sightings} />}
        ></Route>
        <Route
          path="/sightings/:sightingIndex"
          element={<Single sightings={sightings} />}
        ></Route>
        {/* Route that renders new sighting form */}
        <Route path="new" element={<NewSightingForm sightings={sightings} />} />
      </Routes>
    </div>
  );
}
