import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constant";

const NewSightingform = () => {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    switch (event.target.name) {
      case "date":
        setDate(event.target.value);
        break;
      case "location":
        setLocation(event.target.value);
        break;
      case "notes":
        setNotes(event.target.value);
        break;
      default:
    }
  };

  const handleSubmit = (event) => {
    // Prevent default form redirect on submission
    event.preventDefault();
    console.log(event);

    // Send request to create new sighting in backend
    axios
      .post(`${BACKEND_URL}/sightings`, {
        date,
        location,
        notes,
      })
      .then((res) => {
        // Clear form state
        setDate("");
        setLocation("");
        setNotes("");

        // Navigate to sighting-specific page after submitting form
        navigate("/sightings");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Date and Time</label>
        <input
          // datetime-local input type allows user to input both date and time
          type="datetime-local"
          name="date"
          value={date}
          onChange={handleChange}
        />
        <p className="text-muted">When?</p>
      </div>
      <div>
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={location}
          onChange={handleChange}
          placeholder="Yishun, Singapore"
        />
        <p className="text-muted">WHERE?</p>
      </div>
      <div>
        <label>Notes</label>
        <input
          // Use textarea to give user more space to type
          as="textarea"
          name="notes"
          value={notes}
          onChange={handleChange}
          placeholder="Big bear, bigger than human, walking around the park at night. Very scary."
        />
        <p className="text-muted">Please describe this sighting.</p>
      </div>

      <button variant="primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default NewSightingform;
