import React, { use } from "react";

const Reviews = ({ reviewPromise }) => {
  const reviews = use(reviewPromise);
  console.log(reviews);
  return <div></div>;
};

export default Reviews;
