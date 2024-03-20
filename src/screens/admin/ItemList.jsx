import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import { toast } from "react-toastify";

const ItemList = () => {
  const [item, setItem] = useState([]);
  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();
    setItem(response[0]);
  };

  useEffect(() => {
    loadData();
  }, []);
  // console.log("item", item);
  const handleDelete = async (name) => {
    const res = await fetch("http://localhost:5000/api/deleteitem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
      }),
    });
    if (res) {
      toast.success("Delete Sucessful!", { autoClose: 1000 });
      window.location.reload(2000);
    } else {
      toast.error("some error occured!", { autoClose: 1000 });
    }
  };

  return (
    <div>
      <AdminNavBar />
      <span className="flex font-bold mt-5 text-xl justify-center ">
        BIRYANI'S LIST
      </span>
      <div className="flex flex-col px-2">
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
                      Name
                    </th>
                    {/* <th
                      scope="col"
                      className="text-base font-medium text-white px-6 py-3"
                    >
                      Category Name
                    </th> */}
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
                      Prices
                    </th>
                    <th
                      scope="col"
                      className="text-base font-medium text-white px-6 py-3"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {item.map((data) => {
                    return (
                      <tr className="bg-white border-b">
                        <td className="text-base text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {data.name}
                        </td>
                        {/* <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {data.categoryname}
                        </td> */}
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <img
                            src={data.img}
                            alt="item"
                            className="w-40 h-40 object-fill m-auto"
                          />
                        </td>
                        {/* <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"> */}
                        {data.options.map((option) => {
                          return (
                            <td className="text-base -mt-10 text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              Half:{option.half}
                              <br />
                              Full:{option.full}
                            </td>
                          );
                        })}
                        {/* </td> */}
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <button className="rounded inline-flex items-center hover:scale-110">
                            <img
                              src="images/delete.png"
                              className="h-4 w-4"
                              alt="delete"
                              onClick={() => handleDelete(data.name)}
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
