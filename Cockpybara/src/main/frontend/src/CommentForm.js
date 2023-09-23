import React, { useState } from "react";

const CommentForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [taste, setTaste] = useState("");
  const [overallReview, setOverallReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, taste, overallReview });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        별점:
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </label>
      <br />
      <label>
        리뷰:
        <input
          type="text"
          value={overallReview}
          onChange={(e) => setOverallReview(e.target.value)}
        />
      </label>
      <br />
      <label>
        맛:
        <input
          type="text"
          value={taste}
          onChange={(e) => setTaste(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">제출</button>
    </form>
  );
};

export default CommentForm;
