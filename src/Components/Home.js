import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <p>Welcome to Bigfoot Sightings</p>
      <Link to="/new">Record New Sighting</Link>
      <br />
      <Link to="/sightings">View all Sighting</Link>
      <br />
      <br />
    </div>
  );
};

export default Home;
