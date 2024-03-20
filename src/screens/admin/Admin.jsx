import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
global.flag = false;

const Admin = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    let username = credentials.username;
    let password = credentials.password;
    if (username === "admin" && password === "admin") {
      global.flag = true;
      navigate("/itemlist");
    } else {
      alert("Invalid Credentials");
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
      <div className="flex flex-col bg-white px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
        <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
          Admin Login
        </div>

        <div className="mt-5">
          <form action="#">
            <div className="flex flex-col mb-6">
              <label
                htmlFor="email"
                className="mb-1 text-xs sm:text-sm text-gray-600"
              >
                Username:
              </label>
              <div className="relative">
                <input
                  id="username"
                  type="username"
                  name="username"
                  value={credentials.username}
                  onChange={onChange}
                  className="text-sm sm:text-base placeholder-gray-500 pl-2 rounded-lg border border-gray-400 w-full py-2"
                  placeholder="Username"
                />
              </div>
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
                  value={credentials.password}
                  onChange={onChange}
                  className="text-sm sm:text-base placeholder-gray-500 pl-2 rounded-lg border border-gray-400 w-full py-2"
                  placeholder="Enter Password"
                />
              </div>
            </div>

            <div className="flex w-full">
              <button
                type="submit"
                className="flex items-center justify-center text-white text-sm bg-orange-500 hover:scale-105 rounded py-2 w-full"
                onClick={handleLogin}
              >
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
