import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: parcel, isLoading } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });
  console.log(parcel)
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h2>Please Pay for : {parcel?.parcelName}</h2>
      <button className="btn btn-primary text-black">Pay</button>
    </div>
  );
};

export default Payment;
