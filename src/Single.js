import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
import axios from "axios";
import { BACKEND_URL } from "./constant";
// import { useNavigate } from "react-router-dom";

const Single = ({ sightings }) => {
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState();
  const { sightingIndex } = useParams();
  const sighting = sightings[sightingIndex - 1];
  // const navigate = useNavigate();

  console.log(sightingIndex);

  const getComments = async () => {
    let initialComments = await axios.get(
      `${BACKEND_URL}/sightings/${sightingIndex}/comments`
    );
    setComments(initialComments.data);
  };

  useEffect(() => {
    if (!commentContent) getComments();
  }, [commentContent]);

  console.log(commentContent);

  console.log(sighting);

  if (!sighting) {
    return "No Profile";
  }

  const handleChange = (event) => {
    setCommentContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    // Prevent default form redirect on submission
    event.preventDefault();
    // Send request to create new comment in backend
    await axios
      .post(`${BACKEND_URL}/sightings/${sightingIndex}/comments`, {
        content: commentContent,
      })

      .then((res) => {
        // Clear form state
        setCommentContent("");
      })
      .then((response) => {
        console.log(response);
      });
  };

  console.log(comments);
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
      {comments
        .filter((comment) => comment.sightingId === sighting.id)
        .map((comment) => {
          return <p>{comment.content}</p>;
        })}
      <label>Comments</label>
      <form onSubmit={handleSubmit}>
        <input
          // Use textarea to give user more space to type
          as="textarea"
          name="content"
          value={commentContent}
          onChange={handleChange}
        />
        <button variant="primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Single;
