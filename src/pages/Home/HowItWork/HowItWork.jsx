import React from "react";
import deliveryIcon from "../../../assets/bookingIcon.png";

const HowItWork = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-20 gap-5">
      <div className="bg-white p-5 rounded-2xl">
        <div className="">
          <img src={deliveryIcon} alt="" />
        </div>
        <h3 className="font-bold text-lg my-3">Booking Pick & Drop</h3>
        <p className="text-gray-500 text-sm">
          From personal packages to business shipments — we deliver on time,
          every time.
        </p>
      </div>
      <div className="bg-white p-5 rounded-2xl">
        <div className="">
          <img src={deliveryIcon} alt="" />
        </div>
        <h3 className="font-bold text-lg my-3">Cash On Delivery</h3>
        <p className="text-gray-500 text-sm">
          From personal packages to business shipments — we deliver on time,
          every time.
        </p>
      </div>
      <div className="bg-white p-5 rounded-2xl">
        <div className="">
          <img src={deliveryIcon} alt="" />
        </div>
        <h3 className="font-bold text-lg my-3">Delivery Hub</h3>
        <p className="text-gray-500 text-sm">
          From personal packages to business shipments — we deliver on time,
          every time.
        </p>
      </div>
      <div className="bg-white p-5 rounded-2xl">
        <div className="">
          <img src={deliveryIcon} alt="" />
        </div>
        <h3 className="font-bold text-lg my-3">Booking SME & Corporate</h3>
        <p className="text-gray-500 text-sm">
          From personal packages to business shipments — we deliver on time,
          every time.
        </p>
      </div>
    </div>
  );
};

export default HowItWork;
