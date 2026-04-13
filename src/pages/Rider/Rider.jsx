import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const Rider = () => {
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
  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };
  const riderRegion = useWatch({ control, name: "region" });
  const handleCreateRider = (data) => {
    console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:
            "Your applicationhas been submitted. we will reach to you in 45 days",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };
  return (
    <div className="my-10">
      <h2 className="text-5xl font-bold my-10">Be A Rider</h2>
      <form onSubmit={handleSubmit(handleCreateRider)}>
        {/* two column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* sender info */}
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold mb-2">Rider Details</h4>
            {/* Rider name */}
            <label className="label text-lg font-bold">Rider Name</label>
            <input
              type="text"
              {...register("name")}
              defaultValue={user?.displayName}
              className="input w-full"
              placeholder="Rider Name"
            />
            {/* Rider email */}
            <label className="label text-lg font-bold">Rider Email</label>
            <input
              type="email"
              {...register("email")}
              defaultValue={user?.email}
              className="input w-full"
              placeholder="Rider Email"
            />
            {/* Rider Address */}
            <label className="label text-lg font-bold mt-3">
              Rider Address
            </label>
            <input
              type="text"
              {...register("address")}
              className="input w-full"
              placeholder="Address"
            />
            {/* Rider Region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-lg font-bold">
                Rider Regions
              </legend>
              <select
                {...register("region")}
                defaultValue="Pick a region"
                className="select w-full"
              >
                <option disabled={true}>Pick a region</option>
                {regions.map((r, i) => (
                  <option key={i}>{r}</option>
                ))}
              </select>
            </fieldset>
            {/* Rider Dsitricts */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-lg font-bold">
                Rider District
              </legend>
              <select
                {...register("riderRegion")}
                defaultValue="Pick a district"
                className="select w-full"
              >
                <option disabled={true}>Pick a district</option>
                {districtsByRegion(riderRegion).map((r, i) => (
                  <option key={i}>{r}</option>
                ))}
              </select>
            </fieldset>
          </fieldset>
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold mb-2">More Details</h4>
            {/* Rider Driving License */}
            <label className="label text-lg font-bold">Driving License</label>
            <input
              type="text"
              {...register("license")}
              className="input w-full"
              placeholder="Driving License"
            />
            {/* Rider Nid */}
            <label className="label text-lg font-bold">NID</label>
            <input
              type="text"
              {...register("nid")}
              className="input w-full"
              placeholder="NID"
            />
            {/* Rider Bike information */}
            <label className="label text-lg font-bold mt-3">
              Bike Information
            </label>
            <input
              type="text"
              {...register("bikeInformation")}
              className="input w-full"
              placeholder="Bike Information"
            />
          </fieldset>
          {/* receiver info */}
        </div>
        <input
          type="submit"
          className="btn btn-primary text-secondary mt-5"
          value="Apply as a Rider"
        />
      </form>
    </div>
  );
};

export default Rider;
