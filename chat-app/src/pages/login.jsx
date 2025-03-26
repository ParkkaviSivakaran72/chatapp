import React, { useState } from "react";
import Assets from "../assets/assets.js";
import { signup,login } from "../config/firebase.js";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign up");
  const [userName,setUserName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const onsubmitHandler = (event) => {
    event.preventDefault();
    if(currentState === "Sign up"){
      signup(userName,email,password);
    }
    else{
      login(email,password);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-center">
          <img src={Assets.logo_big} alt="Logo" className="w-24 h-24" />
        </div>

        <form onSubmit = {onsubmitHandler} className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-gray-700">
            {currentState}
          </h2>

          {currentState === "Sign up" && (
            <input
              onChange = {(event) => setUserName(event.target.value)}
              value = {userName}
              type="text"
              placeholder="Username"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          )}

          <input
            onChange = {(event) => setEmail(event.target.value)}
            value = {email}
            type="email"
            placeholder="Email address"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          />

          <input
            onChange = {(event) => setPassword(event.target.value)}
            value = {password}
            type="password"
            placeholder="Password"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          />

          <div className="flex items-center space-x-2">
            <input type="checkbox" className="w-4 h-4 text-blue-600" />
            <p className="text-gray-600 text-sm">
              Agree to the{" "}
              <span className="text-blue-500 cursor-pointer">terms</span> and{" "}
              <span className="text-blue-500 cursor-pointer">
                privacy policy
              </span>
              .
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            {currentState === "Sign up" ? "Create Account" : "Login"}
          </button>

          <div className="text-center text-gray-600 text-sm">
            {currentState === "Sign up" ? (
              <p>
                Already have an account?{" "}
                <span
                  onClick={() => setCurrentState("Login")}
                  className="text-blue-500 cursor-pointer hover:underline"
                >
                  Click here
                </span>
              </p>
            ) : (
              <p>
                Create an Account?{" "}
                <span
                  onClick={() => setCurrentState("Sign up")}
                  className="text-blue-500 cursor-pointer hover:underline"
                >
                  Click here
                </span>
                <p className="mt-2">
                  <span className="text-blue-500 cursor-pointer hover:underline">
                    Forgot Password?
                  </span>
                </p>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
