import React from "react";
import serviceIcon from "../../../assets/service.png";

const OurServices = () => {
  return (
    <div className="bg-secondary py-10 rounded-2xl py-20">
      <div className="text-center">
        <h2 className="text-white font-bold text-4xl">Our Services</h2>
        <p className="text-gray-300">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business <br /> shipments — we
          deliver on time, every time.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-wrap gap-5 px-10 my-10">
        <div className="bg-white p-5 rounded-2xl flex flex-col items-center transition duration-300 hover:bg-primary">
          <div className="size-20 rounded-full flex justify-center items-center bg-[#EEEDFC]">
            <img src={serviceIcon} alt="" />
          </div>
          <h3 className="text-lg font-bold my-3">
            Express & Standard Delivery
          </h3>
          <p className="text-center text-sm text-gray-500">
            We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6
            hours from pick-up to drop-off.
          </p>
        </div>
        <div className="bg-white p-5 rounded-2xl flex flex-col items-center transition duration-300 hover:bg-primary">
          <div className="size-20 rounded-full flex justify-center items-center bg-[#EEEDFC]">
            <img src={serviceIcon} alt="" />
          </div>
          <h3 className="text-lg font-bold my-3">Nationwide Delivery</h3>
          <p className="text-center text-sm text-gray-500">
            We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6
            hours from pick-up to drop-off.
          </p>
        </div>
        <div className="bg-white p-5 rounded-2xl flex flex-col items-center transition duration-300 hover:bg-primary">
          <div className="size-20 rounded-full flex justify-center items-center bg-[#EEEDFC]">
            <img src={serviceIcon} alt="" />
          </div>
          <h3 className="text-lg font-bold my-3">Fulfillment Solution</h3>
          <p className="text-center text-sm text-gray-500">
            We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6
            hours from pick-up to drop-off.
          </p>
        </div>
        <div className="bg-white p-5 rounded-2xl flex flex-col items-center transition duration-300 hover:bg-primary">
          <div className="size-20 rounded-full flex justify-center items-center bg-[#EEEDFC]">
            <img src={serviceIcon} alt="" />
          </div>
          <h3 className="text-lg font-bold my-3">Cash on Home Delivery</h3>
          <p className="text-center text-sm text-gray-500">
            We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6
            hours from pick-up to drop-off.
          </p>
        </div>
        <div className="bg-white p-5 rounded-2xl flex flex-col items-center transition duration-300 hover:bg-primary">
          <div className="size-20 rounded-full flex justify-center items-center bg-[#EEEDFC]">
            <img src={serviceIcon} alt="" />
          </div>
          <h3 className="text-lg font-bold my-3">
            Corporate Service / Contract In Logistics
          </h3>
          <p className="text-center text-sm text-gray-500">
            We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6
            hours from pick-up to drop-off.
          </p>
        </div>
        <div className="bg-white p-5 rounded-2xl flex flex-col items-center transition duration-300 hover:bg-primary">
          <div className="size-20 rounded-full flex justify-center items-center bg-[#EEEDFC]">
            <img src={serviceIcon} alt="" />
          </div>
          <h3 className="text-lg font-bold my-3">Parcel Return</h3>
          <p className="text-center text-sm text-gray-500">
            We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6
            hours from pick-up to drop-off.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
