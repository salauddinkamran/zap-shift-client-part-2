import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const [showPassword, setShowPassword] = useState(null);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRegistation = (data) => {
    const profileImg = data.photo[0];
    createUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", profileImg);
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;
        axios
          .post(image_API_URL, formData)
          .then((res) => {
            const photoURL = res.data.data.url;
            // create user in the database
            const userInfo = {
              email: data.email,
              displayName: data.name,
              photoURL: photoURL,
            };
            axiosSecure.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                console.log("user created in the database");
              }
            });
            const updateProfile = {
              displayName: data.name,
              photoURL: photoURL,
            };
            updateUserProfile(updateProfile)
              .then(() => {
                console.log("user update done");
                navigate("/");
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <div className="mb-5">
            <h2 className="text-5xl font-bold">Create an Account</h2>
            <p className="text-base">Register with ZapShift</p>
          </div>
          <form onSubmit={handleSubmit(handleRegistation)}>
            <fieldset className="fieldset">
              {/* name */}
              <label className="label text-base">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input text-base"
                placeholder="Your Name"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-400 text-sm">Name is required</p>
              )}

              {/* photo field */}
              <label className="label text-base">Photo Uplode</label>
              <input
                type="file"
                {...register("photo", { required: true })}
                className="file-input"
                placeholder="Your photo"
              />
              {errors.photo?.type === "required" && (
                <p className="text-red-500">Photo is required</p>
              )}

              {/* email */}
              <label className="label text-base">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input text-base"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-400 text-sm">Email is required</p>
              )}
              {/* password */}
              <label className="label text-base">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    pattern:
                      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                  })}
                  className="input text-base"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="btn btn-xs absolute top-2 right-5"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {errors.password?.type === "required" && (
                <p className="text-red-400 text-sm">Password is required</p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-400 text-sm">
                  password should contain atleast one number and one special
                  character
                </p>
              )}
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Register</button>
            </fieldset>
            <p>
              Already have an account{" "}
              <Link
                className="text-blue-400 underline"
                state={location?.state}
                to="/login"
              >
                Login
              </Link>
            </p>
          </form>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Register;
