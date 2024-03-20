import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";

const OrderList = () => {
  const [orderData, setorderData] = useState([]);
  //   const [email, setEmail] = useState("");
  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();
    setorderData(response);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <AdminNavBar />
      <div>
        {orderData &&
          orderData.map((item, index) => (
            <div key={index}>
              <h1 className="mx-20 my-10 text-3xl hover:font-bold">
                {item.email}
              </h1>
              <div>
                {item.order_data
                  .slice(0)
                  .reverse()
                  .map((item) => {
                    return item.map((arrayData) => {
                      return (
                        <div>
                          {arrayData.Order_date ? (
                            <div className="text-2xl mx-20 hover:font-bold">
                              {arrayData.Order_date}
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
                  })}
                {/* {Array.isArray(item.order_data) ? (
                  item?.order_data.map((subArray, subIndex) => (
                    <div key={subIndex}>
                      {subArray.map((subItem, subItemIndex) => (
                        <span key={subItemIndex}>{subItem}</span>
                      ))}
                    </div>
                  ))
                ) : (
                  <p>Invalid order data format</p>
                )} */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrderList;
