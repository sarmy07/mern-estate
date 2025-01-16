import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/auth/authSlice";
import OAuth from "../components/oauth/OAuth";

export default function Login() {
  const [formData, setFormData] = useState({});
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
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
      const res = await loginUser(formData).unwrap();
      dispatch(setUser({ user: res }));
      alert("Login Successful");
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          {isLoading ? "Loading" : "Login"}
        </button>
        <OAuth />
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
