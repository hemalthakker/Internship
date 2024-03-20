import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Address = () => {
  const [item, setItem] = useState({
    house: "",
    street: "",
    area: "",
    pincode: "",
  });

  const onChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleSubmit = async () => {
    let userEmail = localStorage.getItem("userEmail");
    const address = [item.house, item.street, item.area, item.pincode].join(
      ","
    );
    const response = await fetch("http://localhost:5000/api/address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        address: address,
      }),
    });
    const { sucess } = await response.json();
    if (sucess) {
      toast.success("Address Added Sucessfully!", { autoClose: 1000 });
      navigate("/");
    } else {
      toast.error("some error occured!", { autoClose: 1000 });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
      <div className="flex flex-col bg-white px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
        <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
          Enter Address
        </div>

        <div className="mt-5">
          <form action="#">
            <div className="flex flex-col mb-6">
              <label
                for="houseno"
                className="mb-1 text-xs sm:text-sm text-gray-600"
              >
                House No:
              </label>
              <div className="relative">
                <input
                  id="houseno"
                  type="text"
                  name="house"
                  className="text-sm sm:text-base placeholder-gray-500 pl-2 rounded-lg border border-gray-400 w-full py-2"
                  value={item.house}
                  onChange={onChange}
                  placeholder="Enter House No"
                />
              </div>
            </div>

            <div className="flex flex-col mb-6">
              <label
                for="appartment_street"
                className="mb-1 text-xs sm:text-sm text-gray-600"
              >
                Appartment/Street:
              </label>
              <div className="relative">
                <input
                  id="appartment_street"
                  type="text"
                  name="street"
                  className="text-sm sm:text-base placeholder-gray-500 pl-2 rounded-lg border border-gray-400 w-full py-2"
                  placeholder="Enter Appartment/Street"
                  value={item.street}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="flex flex-col mb-6">
              <label
                for="area"
                className="mb-1 text-xs sm:text-sm text-gray-600"
              >
                Area:
              </label>
              <div className="relative">
                <input
                  id="area"
                  type="text"
                  name="area"
                  className="text-sm sm:text-base placeholder-gray-500 pl-2 rounded-lg border border-gray-400 w-full py-2"
                  placeholder="Enter Area"
                  value={item.area}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="flex flex-col mb-6">
              <label
                for="pincode"
                className="mb-1 text-xs sm:text-sm text-gray-600"
              >
                Pincode:
              </label>
              <div className="relative">
                <input
                  id="pincode"
                  type="number"
                  name="pincode"
                  className="text-sm sm:text-base placeholder-gray-500 pl-2 rounded-lg border border-gray-400 w-full py-2"
                  placeholder="Enter Pincode"
                  value={item.pincode}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="flex w-full">
              <button
                type="submit"
                className="button-87 flex items-center justify-center text-white text-sm hover:scale-105 rounded py-2 w-full"
                onClick={handleSubmit}
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Address;
