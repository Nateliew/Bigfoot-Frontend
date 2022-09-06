import React from "react";
import { useParams } from "react-router-dom";
import "./App.css";

const Single = ({ sightings }) => {
  console.log(sightings);
  const { sightingIndex } = useParams();

  const sighting = sightings[sightingIndex];

  if (!sighting) {
    return "No Profile";
  }

  return (
    <div className="App">
      <header className="App-header">
        {`Report Number: ${sighting.id}`}
        <br />
        {`County: ${sighting.location}`}
        <br />
        {`Year: ${sighting.date}`}
        <br />
        {`Description: ${sighting.notes}`}
      </header>
    </div>
  );
};

export default Single;
