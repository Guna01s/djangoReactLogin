import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import "../Styles/LoginStyle.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import ResortImage from "../Assets/resortImage.jpg";
import { useLoginUserMutation } from "../services/userAuthApi";
import { useDispatch } from "react-redux";

// Define Yup schema for validation
const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

function Login() {
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();

  const {
    handleSubmit: rhfHandleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission logic
  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data);

      console.log("response ", res);
      if (res?.data?.status_code === 200) {
        console.log(res, "data");
        alert(res?.data?.message, "in if");
        navigate("/dashboard");
      } else {
        alert(res?.error?.data?.error);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="mainContainer">
      <div className="container-1">
        <img
          alt="Resort img"
          src={ResortImage}
          height={450}
          width={500}
          style={{
            borderRadius: "5px",
          }}
        />
      </div>
      <div className="container-2">
        <h2 style={{ color: "white" }}>Sign In</h2>
        <p style={{ width: 300, color: "white" }}>
          Enter your email address and password to access your account
        </p>
        <form onSubmit={rhfHandleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="login-label">
              Email address
            </label>
            <br />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <>
                  <input
                    type="email"
                    placeholder="Enter your E-mail"
                    className="login-inputs"
                    {...field}
                  />
                  <p style={{ color: "red", margin: 0, fontSize: "12px" }}>
                    {errors.email?.message}
                  </p>
                </>
              )}
            />
          </div>
          <div>
            <label htmlFor="password" className="login-label">
              Password
            </label>{" "}
            <br />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <>
                  <input
                    type="password"
                    placeholder="Enter your Password"
                    className="login-inputs"
                    {...field}
                  />
                  <p style={{ color: "red", margin: 0, fontSize: "12px" }}>
                    {errors.password?.message}
                  </p>
                </>
              )}
            />
          </div>
          <button type="submit" className="login-button">
            Log In
          </button>
          <p style={{ color: "white" }}>
            Don't have an account?{" "}
            <Link to="/SignUp" style={{ color: "white" }}>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
