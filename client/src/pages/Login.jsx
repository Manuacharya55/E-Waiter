import { useRef, useState, useEffect } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { handlePostRequest } from "../Api/post";
import "../styles/form.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { socket } from "../utils/socket";

const Login = () => {
  const username = useRef("");
  const password = useRef("");
  const { setLocalStorage } = useAuth();
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL + "/auth/login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: username.current.value,
      password: password.current.value,
    };

    const serverResponse = handlePostRequest(url, data, "");

    toast.promise(serverResponse, {
      loading: "Logging in...",
      success: (response) => {
        if (response.success) {
          setLocalStorage(response.data.token, response.data.user.role);

          switch (response.data.user.role) {
            case "admin":
              navigate("/dashboard");
              break;
            case "table":
              navigate("/reciepe");
              break;
            case "sheff":
              navigate("/sheff");
              break;
            case "waiter":
              navigate("/waiter");
              break;
          }

          return "Login Successful";
        } else {
          throw new Error("Invalid Credentials");
        }
      },
      error: (err) => err.message || "Login failed",
    });
  };

  return (
    <div id="login-page-holder">
      <form id="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div id="form-icon">
          <FaUser />
          <input
            type="text"
            ref={username}
            placeholder="Enter The Table Number"
          />
        </div>
        <div id="form-icon">
          <FaLock />
          <input
            type="password"
            ref={password}
            placeholder="Enter The Table Password"
          />
        </div>

        <button id="login" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
