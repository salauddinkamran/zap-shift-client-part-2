import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      console.log(res.data);
      return res.data;
    },
  });

  const handleParcelDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed)
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            // refetch the data in the ui
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcels has been deleted.",
              icon: "success",
            });
          }
        });
    });
  };

  const handlePayment = async (parcel) => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
    };
    const res = await axiosSecure.post(
      "/new-payment-checkout-session",
      paymentInfo,
    );
    console.log(res.data);
    window.location.assign(res.data.url);
  };

  return (
    <div className="pt-5 pl-5">
      <h2 className="text-2xl font-medium mb-5">
        All of my parcels : {parcels.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>TrackingId</th>
              <th>Delivery Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>
                  {parcel.paymentStatus === "paid" ? (
                    <span className="text-green-500">Paid</span>
                  ) : (
                    <button
                      onClick={() => handlePayment(parcel)}
                      to={`/dashboard/payment/${parcel._id}`}
                      className="btn btn-primary btn-sm text-black"
                    >
                      Pay
                    </button>
                  )}
                </td>
                <td>{parcel.trackingId}</td>
                <td>{parcel.deliveryStatus}</td>
                <td className="flex gap-5">
                  <button className="btn btn-accent text-white">
                    <FiEdit />
                  </button>
                  <button className="btn btn-info text-white">
                    <FaMagnifyingGlass />
                  </button>
                  <button
                    onClick={() => handleParcelDelete(parcel._id)}
                    className="btn btn-error text-white"
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

export default MyParcels;
