import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import amazonIcon from "../../../assets/brands/amazon.png";
import amazonVectorIcon from "../../../assets/brands/amazon_vector.png";
import casioIcon from "../../../assets/brands/casio.png";
import monstarIcon from "../../../assets/brands/moonstar.png";
import randstadIcon from "../../../assets/brands/randstad.png";
import starIcon from "../../../assets/brands/star.png";
import startPeopleIcon from "../../../assets/brands/start_people.png";
import { Autoplay } from "swiper/modules";

const brandLogos = [
  amazonIcon,
  amazonVectorIcon,
  casioIcon,
  monstarIcon,
  randstadIcon,
  starIcon,
  startPeopleIcon,
];

const Brands = () => {
  return (
    <div className="my-10">
      <div>
        <h3 className="text-xl font-bold text-secondary text-center">
          We've helped thousands of sales teams
        </h3>
      </div>
      <Swiper
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="my-10"
        modules={[Autoplay]}
      >
        {brandLogos.map((logo, index) => (
          <SwiperSlide key={index}>
            <img src={logo} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brands;
