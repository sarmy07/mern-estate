import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import OAuth from "../components/oauth/OAuth";

export default function Register() {
  const [formData, setFormData] = useState({});
  const [registerUser, { isLoading, error }] = useRegisterUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(formData).unwrap();
      dispatch(setUser({ user: res }));
      alert("Registration successful");
      console.log(res);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        {error && <p className="text-red-500">{error.data}</p>}
        <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 uppercase disabled:opacity-80">
          {isLoading ? "Loading..." : "Register"}
        </button>
        <OAuth />
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
