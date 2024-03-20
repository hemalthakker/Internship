import React, { useState } from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import Modal from "../modal";
import Address from "./Address";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [add, setAdd] = useState(false);
  const [showAddress, SetShowAddress] = useState(false);
  let data = useCart();
  let dispatch = useDispatchCart();

  const getAddress = async () => {
    let userEmail = localStorage.getItem("userEmail");
    try {
      const addressUrl = "http://localhost:5000/api/getAddress";
      let res = await fetch(addressUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
        }),
      });
      res = await res.json();
      if (res?.sucess) {
        setAdd(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  if (data.length === 0) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center mt-20">
          <img src="images/empty.png" alt="empty cart" />
        </div>
      </>
    );
  }

  const initPayment = (paymentData) => {
    const options = {
      key: "rzp_test_4ULCYML9OnP2B6",
      amount: paymentData.amount,
      currency: paymentData.currency,
      name: "Biryani Bowl",
      description: "Test Transaction",
      image: "/public/images/logo.jpg",
      order_id: paymentData.id,
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:5000/api/payment/verify";
          let res = await fetch(verifyUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              response,
            }),
          });
          const resData = await res.json();
          if (resData) {
            let userEmail = localStorage.getItem("userEmail");
            let response = await fetch("http://localhost:5000/api/orderData", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString(),
              }),
            });

            if (response.status === 200) {
              toast.success("Order Placed Successfully!", { autoClose: 1000 });
              dispatch({ type: "DROP" });
              navigate("/myorder");
            }
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handleCheckOut = async () => {
    try {
      const orderUrl = "http://localhost:5000/api/payment/orders";
      let res = await fetch(orderUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalPrice,
        }),
      });
      const paymentData = await res.json();
      initPayment(paymentData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddress = () => {
    SetShowAddress(true);
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      <Navbar />
      <div className="flex flex-col px-20">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-center">
                <thead className="border-2 border-white bg-black">
                  <tr>
                    <th
                      scope="col"
                      className="text-base font-medium text-white px-6 py-3"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="text-base font-medium text-white px-6 py-3"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="text-base font-medium text-white px-6 py-3"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="text-base font-medium text-white px-6 py-3"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="text-base font-medium text-white px-6 py-3"
                    >
                      Options
                    </th>
                    <th
                      scope="col"
                      className="text-base font-medium text-white px-6 py-3"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="text-base font-medium text-white px-6 py-3"
                    >
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((food, index) => (
                    <tr className="bg-white border-b">
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {food.name}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <img
                          className="h-32 w-32 mx-auto"
                          src={food.img}
                          alt="food"
                        />
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {food.qty}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {food.size}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {food.price}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <button
                          className="rounded inline-flex items-center hover:scale-110"
                          onClick={() => {
                            toast.success("Item removed from cart", {
                              autoClose: 1000,
                            });
                            dispatch({ type: "REMOVE", index: index });
                          }}
                        >
                          <img
                            src="images/delete.png"
                            className="h-4 w-4"
                            alt="delete"
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <h1 className="mt-8 text-xl ml-3">
                  Total Price: {totalPrice}/-
                </h1>
              </div>

              {add ? (
                <div>
                  <button
                    className="rounded-md ml-3 mt-3 bg-black text-white px-2 py-2 hover:scale-105"
                    onClick={handleCheckOut}
                  >
                    {" "}
                    Check Out{" "}
                  </button>
                </div>
              ) : (
                <button
                  className="rounded-md ml-3 mt-3 bg-black text-white px-2 py-2 hover:scale-105"
                  onClick={handleAddress}
                >
                  {" "}
                  Add Address{" "}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {showAddress ? (
        <Modal onClose={() => SetShowAddress(false)}>
          <Address></Address>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
