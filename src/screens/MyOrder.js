import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const MyOrder = () => {
  const [orderData, setorderData] = useState({});

  const fetchMyOrder = async () => {
    await fetch("http://localhost:5000/api/myorderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      let response = await res.json();
      await setorderData(response);
    });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="flex flex-col">
        <div className="row">
          {orderData !== {} ? (
            Array(orderData).map((data) => {
              return data.orderData
                ? data.orderData.order_data
                    .slice(0)
                    .reverse()
                    .map((item) => {
                      return item.map((arrayData) => {
                        return (
                          <div>
                            {arrayData.Order_date ? (
                              <div className="text-2xl mx-20 hover:font-bold">
                                {(data = arrayData.Order_date)}
                                <hr />
                              </div>
                            ) : (
                              <div className="flex content-between justify-between items-center w-fit">
                                <img
                                  src={arrayData.img}
                                  className="w-32 h-32 mx-20 my-2"
                                  alt="food"
                                />
                                <div className="mr-64">
                                  <h1 className="font-bold text-lg">
                                    {arrayData.name}
                                  </h1>
                                  <span className="text-base">
                                    {arrayData.size}
                                  </span>
                                </div>
                                <span className="pr-60 font-bold text-lg">
                                  {arrayData.qty} pcs
                                </span>
                                <span className="mr-52 font-bold text-lg">
                                  ₹{arrayData.price}/-
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      });
                    })
                : "";
            })
          ) : (
            <div>
              <img src="/images/noorder.jpg" alt="noorder" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
