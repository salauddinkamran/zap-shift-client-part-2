import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";
import { FaEye, FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const { data: riders = [], refetch } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const updateRiderStatus = (rider, status) => {
    const updateInfo = { status: status, email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider status is set to ${status}`,
          showConfirmButton: false,
          timer: 2000,
        });
        refetch();
      }
    });
  };
  const handleApproval = (rider) => {
    updateRiderStatus(rider, "approved");
  };

  const handleRejection = (rider) => {
    updateRiderStatus(rider, "rejected");
  };

  const handleRiderDelete = (id) => {
    axiosSecure.delete(`/riders/${id}`).then((res) => {
      if (res.data.deletedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Rider request deleted successfuly!",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };
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
              <th>Application Status</th>
              <th>Work Status</th>
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
                <td>
                  <p
                    className={`${rider.status === "approved" ? "text-green-800" : "text-red-800"}`}
                  >
                    {rider.status}
                  </p>
                </td>
                <td>{ rider.workStatus}</td>
                <td className="flex gap-3">
                  <button className="btn">
                    <FaEye />
                  </button>
                  <button className="btn" onClick={() => handleApproval(rider)}>
                    <FaUserCheck />
                  </button>
                  <button
                    onClick={() => handleRejection(rider)}
                    className="btn"
                  >
                    <IoPersonRemoveSharp />
                  </button>
                  <button
                    onClick={() => handleRiderDelete(rider._id)}
                    className="btn"
                  >
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
