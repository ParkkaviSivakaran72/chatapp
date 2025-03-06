import React from "react";
import Assets from "../assets/assets.js";

const Login = () => {
  return (
    <div>
      <img src={Assets.logo_big} alt="" />
      <h2>Signup</h2>
      <form action="">
        <input type="text" placeholder="Username" required />
        <input type="email" placeholder="Email address" required />
        <input type="password" placeholder="Password" required />
        <input type="checkbox" />
        <p>Agree to the terms and privacy policy.</p>
        <button type="submit">Signup</button>
        <p>
          Already have an account <span><a href="">Click here</a></span>
        </p>
        <p>
          <span><a href="">Forgot Password</a></span>
        </p>
      </form>
    </div>
  );
};

export default Login;
