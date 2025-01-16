import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Login</h1>
      <form className="flex flex-col gap-4">
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
          Login
        </button>
      </form>
      <div className="mt-5">
        <p className="">
          Dont have an account?{" "}
          <Link className="text-blue-700" to={"/register"}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
