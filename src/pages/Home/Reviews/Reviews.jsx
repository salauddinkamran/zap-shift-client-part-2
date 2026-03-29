import React, { use } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "./ReviewCard";

const Reviews = ({ reviewPromise }) => {
  const reviews = use(reviewPromise);
  console.log(reviews);
  return (
    <div className="my-24">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-secondary mb-5">
          What our customers are sayings
        </h3>
        <p className="text-gray-500 text-sm">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce <br /> pain, and strengthen your
          body with ease!
        </p>
      </div>
      <div>
        <Swiper
          loop={true}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"3"}
          coverflowEffect={{
            rotate: 50,
            stretch: "50%",
            depth: 200,
            modifier: 1,
            scale: .75,
            slideShadows: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewCard review={review}></ReviewCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Reviews;
