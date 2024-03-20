import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

const loginSchema = Yup.object({
  name: Yup.string().min(2).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const Signup = () => {
  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: (values) => {
        // console.log(values);
      },
    });

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    });
    const json = await response.json();
    // console.log(json);
    if (!json.sucess) {
      toast.error("enter valid credentials", { autoClose: 1000 });
    } else {
      toast.success("Registration sucessful!", { autoClose: 1000 });
      navigate("/login");
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
      <div className="flex flex-col bg-white px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
        <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
          Create New Account
        </div>

        <div className="mt-5">
          <form action="#" onSubmit={handleSubmit}>
            <div className="flex flex-col mb-6">
              <label
                htmlFor="name"
                className="mb-1 text-xs sm:text-sm text-gray-600"
              >
                Name:
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="text-sm sm:text-base placeholder-gray-500 pl-2 rounded-lg border border-gray-400 w-full py-2"
                  placeholder="Enter Name"
                />
              </div>
              {errors.email && touched.email ? (
                <p className="text-red-600">{errors.name}</p>
              ) : null}
            </div>

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
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="text-sm sm:text-base placeholder-gray-500 pl-2 rounded-lg border border-gray-400 w-full py-2"
                  placeholder="E-Mail Address"
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
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="text-sm sm:text-base placeholder-gray-500 pl-2 rounded-lg border border-gray-400 w-full py-2"
                  placeholder="Enter Password"
                />
              </div>
              {errors.email && touched.email ? (
                <p className="text-red-600">{errors.password}</p>
              ) : null}
            </div>

            <div className="flex w-full">
              <button
                type="submit"
                className="flex items-center justify-center text-white text-sm bg-orange-500 hover:scale-105 rounded py-2 w-full"
                onClick={handleSignup}
              >
                REGISTER
              </button>
            </div>
            <div className="flex items-center justify-center mt-2">
              <span className="mr-1">Already have an account?</span>
              <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
