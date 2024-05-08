

import styles from "../index.css"

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { selectRole } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector(selectRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password))
      .then(() => {
        setRedirect(true);
      })
      .catch(() => {
        console.log(error);
      });
  };

  if (redirect) {
    return (
      <Navigate
        to={role === "regular" ? "/user-dashboard" : "/admin-dashboard"}
        replace
      />
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xs">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-red-500">{error && `Error: ${error}`}</p>
        <div className="mt-4">
          <button
            onClick={() => navigate("/register")}
            className="text-blue-500 hover:text-blue-600 focus:outline-none"
          >
            Register yourself
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
