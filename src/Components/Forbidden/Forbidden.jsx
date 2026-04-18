import React from "react";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div>
      <div className="flex justify-center items-center h-screen flex-col">
        <h2 className="text-5xl font-bold text-center text-red-500 mb-5">
          This is forbidden page
        </h2>
        <div className="flex gap-4">
          <Link className="btn btn-primary text-secondary" to="/">
            Go to home
          </Link>
          <Link
            className="btn btn-primary text-secondary"
            to="/dashboard/my-parcels"
          >
            Go to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
