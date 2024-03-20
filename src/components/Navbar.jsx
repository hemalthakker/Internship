import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";
import { toast } from "react-toastify";

const Navbar = () => {
  let data = useCart();
  const [cartView, setCartView] = useState(false);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("authToken");
    toast.success("Logged out!", { autoClose: 1000 });
    navigate("/login");
  }

  return (
    <div>
      <div className="mt-5 flex flex-wrap items-center justify-between w-full py-4 text-lg text-gray-700 bg-white">
        <div>
          <Link to="/">
            <img
              src="/images/logo.jpg"
              className="w-60 pt-3 hover:scale-110"
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
          {localStorage.getItem("authToken") ? (
            <ul className="pt-4 text-gray-700 font-bold md:flex md:justify-between md:pt-0">
              <li>
                <Link
                  className="md:p-4 pl-24 block lg:hover:scale-105 "
                  to="/myorder"
                >
                  My Orders
                </Link>
              </li>

              <Link to="/cart">
                <li className="md:p-4 pl-24 block lg:hover:scale-105 cursor-pointer">
                  Cart({data.length})
                </li>
              </Link>

              <li>
                <Link
                  className="md:p-4 pl-24 mr-20 block lg:hover:scale-105 "
                  onClick={handleLogout}
                  to="/login"
                >
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            ""
          )}
          {!localStorage.getItem("authToken") ? (
            <ul className="pt-4 text-gray-700 font-bold md:flex md:justify-between md:pt-0">
              <li>
                <Link
                  className="md:p-4 pl-24 block lg:hover:scale-105 "
                  to="/login"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  className="md:p-4 pl-24 block mr-20 lg:hover:scale-105 "
                  to="/signup"
                >
                  Sign up
                </Link>
              </li>
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
