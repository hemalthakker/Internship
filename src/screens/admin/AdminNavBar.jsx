import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminNavBar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  return (
    <div className="mt-5 flex flex-wrap items-center justify-between w-full py-4 text-lg text-gray-700 bg-white">
      <div>
        <Link to="/itemlist">
          <img
            src="/images/logo.jpg"
            className="ml-20 w-60 pt-5 hover:scale-110"
            alt="logo"
          />
        </Link>
      </div>

      <img
        className="w-10 mr-20 cursor-pointer md:hidden lg:hidden"
        src="/images/three.png"
        onClick={() => setIsNavExpanded(!isNavExpanded)}
        id="menu-button"
        alt="hamburger"
      />

      <div
        className={`w-full ${
          isNavExpanded ? "hidden" : "block"
        } md:flex md:items-center md:w-auto`}
        id="menu"
      >
        <ul className="pt-4 text-gray-700 font-bold md:flex md:justify-between md:pt-0">
          <Link
            className="md:p-4 pl-24 block lg:hover:scale-105 "
            to="/userlist"
          >
            <li>User List</li>
          </Link>
          <Link
            className="md:p-4 pl-24 block lg:hover:scale-105 "
            to="/itemlist"
          >
            <li>Biryani List</li>
          </Link>
          <Link
            className="md:p-4 pl-24 block lg:hover:scale-105 "
            to="/additem"
          >
            <li>Add Items</li>
          </Link>
          <Link className="md:p-4 pl-24 block lg:hover:scale-105 " to="/orders">
            <li>Order List</li>
          </Link>
          <Link className="md:p-4 pl-24 mr-20 block lg:hover:scale-105 " to="/">
            <li>Log out</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default AdminNavBar;
