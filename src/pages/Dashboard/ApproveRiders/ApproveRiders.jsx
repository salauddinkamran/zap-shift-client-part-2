import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";
import { FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const { data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });
  const handleApproval = id => {
    console.log(id)
  }
  return (
    <div>
      <h2 className="text-5xl font-medium p-3">
        Rider Pending Approvel: {riders.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>District</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <th>{index + 1}</th>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.riderRegion}</td>
                <td>{rider.status}</td>
                <td className="flex gap-3">
                  <button
                    className="btn"
                    onClick={() => handleApproval(rider._id)}
                  >
                    <FaUserCheck />
                  </button>
                  <button className="btn">
                    <IoPersonRemoveSharp />
                  </button>
                  <button className="btn">
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRiders;
