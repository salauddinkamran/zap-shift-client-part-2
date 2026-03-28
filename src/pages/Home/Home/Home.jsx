import React from "react";
import Banner from "../Banner/Banner";
import HowItWork from "../HowItWork/HowItWork";
import OurServices from "../OurServices/OurServices";

const Home = () => {
  return (
    <div className="py-10">
      <Banner></Banner>
      <HowItWork></HowItWork>
      <OurServices></OurServices>
    </div>
  );
};

export default Home;
