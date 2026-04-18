import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";

const AssignedDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user.email, "driver_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`
      );
      return res.data;
    },
  });
  const handleAcceptDelivery = (parcel) => {
    const statusInfo = { deliveryStatus: "rider_arriving" };
    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Thank you for accepting`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };
  return (
    <div>
      <h2 className="text-5xl font-bold">
        Parcels Pending Pickup: {parcels.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Confirm</th>
              <th>Other Acctions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td className="">
                  {parcel.deliveryStatus === "driver_assigned" 
                   ? <>
                      
                      <button
                        onClick={() => handleAcceptDelivery(parcel)}
                        className="btn btn-primary text-black mr-3"
                      >
                        Accept
                      </button>
                      <button className="btn btn-error text-white">
                        Reject
                      </button>
                    </> : <span>Accepted</span>
                  }
                </td>
                <td>Blue</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedDeliveries;
