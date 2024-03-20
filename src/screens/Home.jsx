import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

const Home = () => {
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    setFoodItem(response[0]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2">
            {foodItem !== []
              ? foodItem.map((filterItems) => {
                  return (
                    <div key={filterItems._id}>
                      <Card
                        foodItem={filterItems}
                        options={filterItems.options[0]}
                      ></Card>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
