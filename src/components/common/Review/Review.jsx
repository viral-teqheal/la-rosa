import React from "react";
import { number } from "yup";

const Review = (props) => {
  const { rating } = props;
  const stars = [];
  const starsNumber =[]
  const fullStars = Math.floor(rating); // Number of full stars
  const hasHalfStar = rating - fullStars >= 0.5; // Check if there is a half star
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<i key={i} className="fa fa-star" />);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<i key={i} className="fa fa-star-half-o" />);
    } else {
      stars.push(<i key={i} className="fa fa-star-o" />);
    }
  }
  return (
    <>
      <div className="rating text-yellow-400 gap-2 flex">
        {stars}
      </div>

    </>
  );
};

export default Review;
