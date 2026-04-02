import React from "react";
import { useForm } from "react-hook-form";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSendParcel = (data) => {
    console.log(data);
  };
  return (
    <div className="my-10">
      <div>
        <h1 className="text-5xl font-bold text-secondary mb-5">
          Send A Parcel
        </h1>
        <h4 className="text-2xl font-bold text-secondary">
          Enter your parcel details
        </h4>
      </div>
      <form onSubmit={handleSubmit(handleSendParcel)}>
        {/* document */}
        <div></div>
        {/* parcel info: name, weigth */}
        <div></div>
        {/* two column */}
        <div>
          {/* sender info */}
          <div></div>
          {/* receiver info */}
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
