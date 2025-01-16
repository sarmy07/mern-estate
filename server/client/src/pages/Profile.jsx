import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: "",
  });

  const handleChange = (e) => {};

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl my-7 font-semibold text-center">Profile</h1>
      <form className="self-center flex flex-col gap-4">
        <img
          src={user?.avatar}
          className="w-24 h-24 rounded-full self-center mt-2"
          alt=""
        />

        <input
          type="text"
          className="border p-3 rounded-lg"
          placeholder="Username"
          id="username"
          defaultValue={formData?.username}
          onChange={handleChange}
        />
        <input
          type="email"
          className="border p-3 rounded-lg"
          placeholder="Email"
          id="username"
          defaultValue={formData?.email}
          onChange={handleChange}
        />
        <input
          type="password"
          className="border p-3 rounded-lg"
          placeholder="Password"
          id="username"
          defaultValue={formData?.password}
          onChange={handleChange}
        />

        <button className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between my-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Log out</span>
      </div>
    </div>
  );
}
