import React, { useState } from "react";
import { Link } from "react-router-dom";
import type { LoginFormData } from "../types/auth.types";
import useLogin from "../hooks/useLogin";
import { getApiErrorMessage } from "../../../utils/apiError";

const LoginForm = () => {
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const { mutate, isPending, isError, error } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(loginData);
  };

  {
    isError && (
      <p className="text-sm text-red-600">
        {getApiErrorMessage(error, "Failed to login")}
      </p>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <h1 className="text-3xl font-bold text-center">Login</h1>

        <p className="text-gray-500 text-center mt-2">
          Sign in to your account
        </p>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
          value={loginData.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-2">
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
          value={loginData.password}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 transition-colors cursor-pointer"
      >
        {isPending ? "Logging in..." : "Login"}
      </button>

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
