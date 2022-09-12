import React from "react";
import "./card.css";
import "./App.css";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Card = ({ sightings }) => {
  console.log(sightings);
  let [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
  };

  return (
    <div className="App">
      <div className="App-header">
        <input
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />

        {/* if it exists or the array is not null, map it out */}
        {sightings
          .filter((sighting) => {
            let filter = searchParams.get("filter");
            if (!filter) return true;
            let number = sighting.id;
            return number === filter;
          })
          .map((sighting, index) => (
            <div className="container">
              <Link
                style={{ display: "block", margin: "1rem 0" }}
                to={`/sightings/${index + 1}`}
                key={sighting.id}
              >
                <div>
                  {sighting.id}
                  <br />
                  {sighting.location}
                  <br />
                  {sighting.date}
                  {/* <br />
                  <p>{sighting.SEASON}</p> */}
                </div>
              </Link>
            </div>
          ))}
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Card;
