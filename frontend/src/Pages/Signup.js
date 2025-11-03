import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../Utils";

const Signup = () => {
  const [signupInfo, setsignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handlechange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copysignupInfo = { ...signupInfo };
    copysignupInfo[name] = value;
    setsignupInfo(copysignupInfo);
  };

  const handlesignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("Name,email and password are required");
    }
    try {
      const url = "http://localhost:8000/auth/signup";
      const response = await fetch(url, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      }
      else if(!success){
        handleSuccess(message)
      }

      console.log(result);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      <form onSubmit={handlesignup} className="signup-form">
        <div>
          <label htmlFor="name">name</label>
          <input
            id="name"
            value={signupInfo.name}
            onChange={handlechange}
            type="text"
            name="name"
            placeholder="Enter your name..."
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handlechange}
            value={signupInfo.email}
            id="email"
            type="text"
            name="email"
            autoFocus
            placeholder="Enter your Email..."
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            value={signupInfo.password}
            onChange={handlechange}
            type="password"
            name="password"
            placeholder="Enter your password..."
          />
        </div>

        <button type="submit">Signup</button>
        <span className="link-text">
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
