import { useContext, useState } from "react";
import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CartContext } from "../App";

function Header() {
  const location = useLocation();
  const {cart} = useContext(CartContext)
  return (
    <header>
      <div className="bg-blue-900 px-30 mx-auto">
        <div className="container mx-auto flex justify-end py-2 gap-3 text-white">
          <Link to="/login">Sign in / Guest</Link>
          <Link to="/register">Create account</Link>
        </div>
      </div>

      <div className="bg-blue-200 py-7 px-30">
        <div className="container mx-auto flex items-center justify-between">
          <div className="logo">
            <Link
              className="px-5 py-4 text-2xl text-white rounded-md bg-blue-600 font-bold hover:bg-blue-800"
              to="/"
            >
              C
            </Link>
          </div>
          <nav>
            <ul className="flex items-center gap-4">
              <li>
                <NavLink
                  className={`${
                    location.pathname == "/" ? "bg-black  text-white" : ""
                  } text-lg text py-2 px-3 rounded-md hover:bg-gray-100 `}
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={`${
                    location.pathname.includes("about")
                      ? "bg-black  text-white"
                      : ""
                  } text-lg text py-2 px-3 rounded-md hover:bg-gray-100 `}
                  to="/about"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={`${
                    location.pathname.includes("products")
                      ? "bg-black  text-white"
                      : ""
                  } text-lg text py-2 px-3 rounded-md hover:bg-gray-100 `}
                  to="/products"
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={`${
                    location.pathname.includes("cart")
                      ? "bg-black  text-white"
                      : ""
                  } text-lg text py-2 px-3 rounded-md hover:bg-gray-100`}
                  to="/cart"
                >
                  Cart
                </NavLink>
              </li> 
            </ul>
          </nav>
          <p>{cart.length}</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
