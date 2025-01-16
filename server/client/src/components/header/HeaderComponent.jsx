import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function HeaderComponent() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="bg-slate-200 shadow-md">
      <div className="flex justify-between p-3 max-w-6xl mx-auto items-center">
        <Link to={"/"}>
          <h1 className="text-lg sm:text-2xl font-bold flex flex-wrap">
            <span className="text-slate-500">Mern</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

        <form className="bg-slate-100 flex items-center p-2 rounded-lg">
          <input
            type="text"
            className="bg-transparent w-24 sm:w-64 p-3 focus:outline-none"
            placeholder="Search..."
          />
          <FaSearch className="text-slate-600 text-lg" />
        </form>

        <ul className="flex gap-4">
          <Link to={"/"}>
            <li className="hidden sm:inline text-slate-700 hover:underline hover:underline-offset-2">
              Home
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="hidden sm:inline text-slate-700 hover:underline hover:underline-offset-2">
              About
            </li>
          </Link>

          {user ? (
            <Link to={"/profile"}>
              <img src={user?.avatar} className="h-7 w-7 rounded-full" alt="user" />
            </Link>
          ) : (
            <Link to={"/login"}>
              <li className=" text-slate-700 hover:underline hover:underline-offset-2">
                Login
              </li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}
