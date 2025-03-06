import React, { useState } from "react";
import Assets from "../assets/assets.js";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign up");
  return (
    <div>
      <img src={Assets.logo_big} alt="" />

      <form action="">
        <h2>{currentState}</h2>
        <div>
        {currentState == "Sign up" ? (
          <input type="text" placeholder="Username" required />
        ) : null}
        </div>
        <div>
        <input type="email" placeholder="Email address" required />
        </div>
        <div>
        <input type="password" placeholder="Password" required />
        </div>
        <div>
        <input type="checkbox" />
        <p>Agree to the terms and privacy policy.</p>
        </div>
        <div>
        {currentState=="Sign up"?<button type="submit">Create Account</button>
        : <button type="submit">Login Account</button>}
        </div>
        <div>
            {currentState == "Sign up" ?
        <p>
          Already have an account
          <span onClick={() => setCurrentState("Login")}>Click here</span>
        </p>:
        <p>Create an Account <span onClick={() => setCurrentState("Sign up")}>Click here</span></p>
        }
        <p>
          <span>Forgot Password</span>
        </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
