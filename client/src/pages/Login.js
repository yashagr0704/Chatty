import React, { useState } from "react";
import "../index.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";
import axios from "axios";
function Login() {

const navigate = useNavigate();
  const [Value, setValue] = useState({
    username: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { username, password } = Value;
      const { data } = await axios.post(loginRoute, {
        username,
        password
      });
      if (data.status === false) toast.error(data.msg, toastOptions);
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };
  const validateForm = () => {
    const { username, password } = Value;
    if (username === "" || password === "") {
      toast.error("Username / Password cannot be empty.", toastOptions);
      return false;
    }
    return true;
  };
  const handleChange = (e) => {
    setValue({ ...Value, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div
        className="container-fluid"
        style={{
          background: "linear-gradient(to top, #fbc2eb 0%, #a18cd1 100%)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          paddingLeft: "0%",
        }}
      >
        <div className="container signin-container">
          <div className="sign-image"></div>
          <div className="container reg-content" style={{ color: "white" }}>
            <h3>Registration Form</h3>
            <form
              action=""
              onSubmit={(event) => {
                handleSubmit(event);
              }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                marginBottom: "20px",
                marginTop: "55px",
              }}
            >
              <div className="mb-3 form-input">
                <input
                  type="text"
                  className="form-controll"
                  name="username"
                  placeholder="Username"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="mb-3 form-input">
                <input
                  type="password"
                  className="form-controll"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
              <p style={{ paddingTop: "10px" }}>
                Create Account{" "}
                <Link to="/register" style={{ textDecoration: "none" }}>
                  Register.
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
