import React from "react";
import useAuth from "../../../hooks/useAuth/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";

const Profile = () => {
  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();
  const { data: userss = {} } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/email/${user?.email}`);
      return res.data;
    },
  });
  console.log(user);
  return (
    <div>
      <div className="flex justify-center items-center flex-col h-screen">
        <div className="rounded-full w-28 h-28">
          <img className="rounded-full w-full h-full" src={userss?.photoURL} alt="" />
        </div>
        <div>
          <h2 className="text-3xl font-medium">Name: {userss?.displayName}</h2>
          <p className="text-lg font-medium">Email: {userss?.email}</p>
          <p className="text-lg font-medium">User Role: {userss?.role}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
