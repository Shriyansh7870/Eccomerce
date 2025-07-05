import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Navigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";

export default function Login() {
  const [values, setValues] = useState({ email: "", password: "" });
  const { user, status, error } = useSelector((s) => s.auth);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(values));
  };

  if (user) return <Navigate to="/" />;

  return (
    <div className="h-screen flex items-center justify-center bg-amber-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow w-80 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Spices Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="input w-full"
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="input w-full"
          onChange={(e) => setValues({ ...values, password: e.target.value })}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          className="btn btn-primary w-full disabled:opacity-50"
          disabled={status === "loading"}
        >
          {status === "loading" ? "..." : "Login"}
        </button>
      </form>
    </div>
  );
}
