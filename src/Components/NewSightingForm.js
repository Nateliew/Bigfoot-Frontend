import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constant";
import Select from "react-select";

const NewSightingform = () => {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

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
    const selectedCategoryIds = selectedCategories.map(({ value }) => value);

    // Send request to create new sighting in backend
    axios
      .post(`${BACKEND_URL}/sightings`, {
        date,
        location,
        selectedCategoryIds,
        notes,
      })
      .then((res) => {
        // Clear form state
        setDate("");
        setLocation("");
        setSelectedCategories([]);
        setNotes("");

        // Navigate to sighting-specific page after submitting form
        navigate("/sightings");
      });
  };

  const logout = () => {
    navigate("/");
  };

  useEffect(() => {
    axios.get(`${BACKEND_URL}/categories`).then((response) => {
      setAllCategories(response.data);
    });
    // Only run this effect on component mount
  }, []);

  const categoryOptions = allCategories.map((category) => ({
    // value is what we store
    value: category.id,
    // label is what we display
    label: category.name,
  }));

  // Make text black in Select field
  const selectFieldStyles = {
    option: (provided) => ({
      ...provided,
      color: "black",
    }),
  };

  const handleSelectChange = (categories) => {
    setSelectedCategories(categories);
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
      <Select
        isMulti
        styles={selectFieldStyles}
        options={categoryOptions}
        value={selectedCategories}
        onChange={handleSelectChange}
        size="small"
      />
      <br />
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

      <button onClick={logout}>Logout</button>
    </form>
  );
};

export default NewSightingform;
