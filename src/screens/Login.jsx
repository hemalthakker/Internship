import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: (values) => {
      },
    });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });
    const json = await response.json();

    if (!json.sucess) {
      toast.error("enter valid credentials!", { autoClose: 1000 });
    } else {
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("userEmail", values.email);
      toast.success("Login Sucessful!", { autoClose: 1000 });

      navigate("/");
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
      <div className="flex flex-col bg-white px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
        <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
          Login To Your Account
        </div>

        <div className="mt-5">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-6">
              <label
                htmlFor="email"
                className="mb-1 text-xs sm:text-sm text-gray-600"
              >
                E-Mail Address:
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  name="email"
                  // value={credentials.email}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="text-sm sm:text-base placeholder-gray-500 pl-2 rounded-lg border border-gray-400 w-full py-2"
                  placeholder="E-Mail Address"
                  // value={}
                />
              </div>
              {errors.email && touched.email ? (
                <p className="text-red-600">{errors.email}</p>
              ) : null}
            </div>

            <div className="flex flex-col mb-6">
              <label
                htmlFor="password"
                className="mb-1 text-xs sm:text-sm text-gray-600"
              >
                Password:
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  name="password"
                  // value={credentials.password}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="text-sm sm:text-base placeholder-gray-500 pl-2 rounded-lg border border-gray-400 w-full py-2"
                  placeholder="Enter Password"
                  // ref={register}
                />
              </div>
              {errors.password && touched.password ? (
                <p className="text-red-600">{errors.password}</p>
              ) : null}
            </div>

            <div className="flex w-full">
              <button
                disabled={errors.password && errors.email}
                type="submit"
                className="flex items-center justify-center text-white text-sm bg-orange-500 hover:scale-105 rounded py-2 w-full"
                onClick={handleLogin}
              >
                LOGIN
              </button>
            </div>
            <div className="flex items-center justify-center mt-2">
              <span className="mr-1">Not an user?</span>
              <Link to="/signup">Signup</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
