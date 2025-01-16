import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Register</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 uppercase disabled:opacity-80">
          Register
        </button>
      </form>
      <div className="mt-5">
        <p className="">
          Already have an account?{" "}
          <Link className="text-blue-700" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
