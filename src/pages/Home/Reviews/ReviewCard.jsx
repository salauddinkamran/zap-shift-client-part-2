import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const {review:title,userName, user_photoURL } = review;
  return (
    <div className="max-w-md bg-base-200 rounded-2xl p-6 shadow-md">
      {/* Quote Icon */}
      <FaQuoteLeft className="text-4xl text-gray-300 mb-4" />

      {/* Text */}
      <p className="text-gray-600 p-4 rounded-md">
        {title}
      </p>

      {/* Divider */}
      <div className="border-t border-dashed border-gray-300 my-6"></div>

      {/* User Info */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-teal-800">
          <img className="rounded-full" src={user_photoURL} alt="" />
        </div>

        {/* Name + Role */}
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{userName}</h3>
          <p className="text-sm text-gray-500">Senior Product Designer</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
