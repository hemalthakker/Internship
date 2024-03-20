import React, { useEffect, useState, useCallback } from "react";
import AdminNavBar from "./AdminNavBar";
import { toast } from "react-toastify";

const UserList = () => {
  const [user, setUser] = useState([]);
  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/userData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();
    setUser(response[0]);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (email) => {
    const res = await fetch("http://localhost:5000/api/deleteuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
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
        USER'S LIST
      </span>
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
                      Name
                    </th>
                    <th
                      scope="col"
                      className="text-base font-medium text-white px-6 py-3"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="text-base font-medium text-white px-6 py-3"
                    >
                      Address
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
                  {user.map((data) => {
                    return (
                      <tr className="bg-white border-b">
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {data.name}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {data.email}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {data.address}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <button className="rounded inline-flex items-center hover:scale-110">
                            <img
                              src="images/delete.png"
                              className="h-4 w-4"
                              alt="delete"
                              onClick={() => handleDelete(data.email)}
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

export default UserList;
