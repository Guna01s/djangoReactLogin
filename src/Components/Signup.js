import React from "react";
import { useForm, Controller } from "react-hook-form";
import "../Styles/LoginStyle.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { signInSchema } from "../Validators/Validators";
import ResortImage from "../Assets/resortImage.jpg";
import { useRegisterUserMutation } from "../services/userAuthApi";

function Signup() {
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const actualData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const res = await registerUser(actualData);

      console.log("response ", res);
      if (res?.data?.status_code === 201) {
        console.log(res, "data");
        alert(res?.data?.message, "in if");
        navigate("/Login");
      } else {
        alert(res?.error?.data?.error);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const {
    control,
    formState: { errors },
    handleSubmit: rhfHandleSubmit,
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

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
        <h2 style={{ color: "white" }}>Free Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="login-label">
              Full Name
            </label>
            <br />
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <>
                  <input
                    type="fullName"
                    placeholder="Enter your Full Name"
                    className="login-inputs"
                    {...field}
                  />
                  <p style={{ color: "red", margin: 0, fontSize: "12px" }}>
                    {errors.fullName?.message}
                  </p>
                </>
              )}
            />
          </div>

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
            Sign Up
          </button>
          <p style={{ color: "white" }}>
            Already have an account?{" "}
            <Link to="/Login" style={{ color: "white" }}>
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
