import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import useAuth from "../../hooks/useAuth/useAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const serviceCenters = useLoaderData();
  const regionDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionDuplicate)];
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });
  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleSendParcel = (data) => {
    console.log(data);
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);
    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight <= 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    console.log("cost", cost);
    data.cost = cost;
    Swal.fire({
      title: "Agree with the cost",
      text: `You will be charged ${cost} taka!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "I agree!",
    }).then((result) => {
      if (result.isConfirmed)
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
        axiosSecure.post("/parcels", data).then((res) => {
          console.log("after saving parcel", res.data);
        });
    });
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
        <div className="flex gap-5 mt-5">
          <label className="label text-base">
            <input
              type="radio"
              {...register("parcelType")}
              value="document"
              className="radio"
              defaultChecked
            />
            Document
          </label>
          <label className="label text-base">
            <input
              type="radio"
              {...register("parcelType")}
              value="non-document"
              className="radio"
            />
            Non-Document
          </label>
        </div>
        {/* parcel info: name, weigth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
          <fieldset className="fieldset">
            <label
              className="label text-lg
             font-bold"
            >
              Parcel Name
            </label>
            <input
              type="text"
              {...register("parcelName")}
              className="input w-full"
              placeholder="Parcel Name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label text-lg font-bold">
              Parcel Weight (kg)
            </label>
            <input
              type="number"
              {...register("parcelWeight")}
              className="input w-full"
              placeholder="Parcel Weight"
            />
          </fieldset>
        </div>
        {/* two column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* sender info */}
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold mb-2">Sender Details</h4>
            {/* sender name */}
            <label className="label text-lg font-bold">Sender Name</label>
            <input
              type="text"
              {...register("senderName")}
              defaultValue={user?.displayName}
              className="input w-full"
              placeholder="Sender Name"
            />
            {/* sender email */}
            <label className="label text-lg font-bold">Sender Email</label>
            <input
              type="email"
              {...register("senderEmail")}
              defaultValue={user?.email}
              className="input w-full"
              placeholder="Sender Email"
            />
            {/* sender address */}
            <label className="label text-lg font-bold mt-3">
              Sender Address
            </label>
            <input
              type="text"
              {...register("senderAddress")}
              className="input w-full"
              placeholder="Sender Address"
            />
            {/* sender region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-lg font-bold">
                Sender Region
              </legend>
              <select
                {...register("senderRegion")}
                defaultValue="Pick a region"
                className="select w-full"
              >
                <option disabled={true}>Pick a region</option>
                {regions.map((r, i) => (
                  <option key={i}>{r}</option>
                ))}
              </select>
            </fieldset>
            {/* sender dsitricts */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-lg font-bold">
                Sender District
              </legend>
              <select
                {...register("senderDistrict")}
                defaultValue="Pick a district"
                className="select w-full"
              >
                <option disabled={true}>Pick a district</option>
                {districtsByRegion(senderRegion).map((r, i) => (
                  <option key={i}>{r}</option>
                ))}
              </select>
            </fieldset>
          </fieldset>
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold mb-2">Receiver Details</h4>
            {/* Receiver name */}
            <label className="label text-lg font-bold">Receiver Name</label>
            <input
              type="text"
              {...register("reveiverName")}
              className="input w-full"
              placeholder="Receiver Name"
            />
            {/* sender email */}
            <label className="label text-lg font-bold">Receiver Email</label>
            <input
              type="email"
              {...register("receiverEmail")}
              className="input w-full"
              placeholder="Receiver Email"
            />
            {/* sender address */}
            <label className="label text-lg font-bold mt-3">
              Receiver Address
            </label>
            <input
              type="text"
              {...register("receiverAddress")}
              className="input w-full"
              placeholder="Receiver Address"
            />
            {/* receiver region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-lg font-bold">
                Receiver Region
              </legend>
              <select
                {...register("receiverRegion")}
                defaultValue="Pick a region"
                className="select w-full"
              >
                <option disabled={true}>Pick a region</option>
                {regions.map((r, i) => (
                  <option key={i}>{r}</option>
                ))}
              </select>
            </fieldset>
            {/* receiver dsitricts */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-lg font-bold">
                Receiver District
              </legend>
              <select
                {...register("receiverDistrict")}
                defaultValue="Pick a district"
                className="select w-full"
              >
                <option disabled={true}>Pick a district</option>
                {districtsByRegion(receiverRegion).map((r, i) => (
                  <option key={i}>{r}</option>
                ))}
              </select>
            </fieldset>
          </fieldset>
          {/* receiver info */}
        </div>
        <input type="submit" className="btn btn-primary text-secondary mt-5" />
      </form>
    </div>
  );
};

export default SendParcel;
