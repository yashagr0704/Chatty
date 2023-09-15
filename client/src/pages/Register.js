import React , {useState} from "react";
import "../index.css";
import { ToastContainer, toast } from "react-toastify";
import {useNavigate , Link} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {registerRoute} from "../utils/APIRoutes"
function Register() {
  const navigate = useNavigate();
  const [Value, setValue] = useState({
    username : "",
    email : "",
    password : "",
    confirmPassword : ""
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handleSubmit = async (event) =>{
    event.preventDefault();
    if(handleValidation()){
        const {username , email , password , confirmPassword} = Value;
        const {data} = await axios.post(registerRoute , {
          username,
          email,
          password,
          confirmPassword
        });
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
          localStorage.setItem(
            process.env.REACT_APP_LOCALHOST_KEY,
            JSON.stringify(data.user)
          );
          navigate("/");
        }
    }
  }
  const handleValidation = () =>{
    const {username , email , password , confirmPassword} = Value;
    if(password !== confirmPassword){
      toast.error("Password and Confirm Password should be same." , toastOptions);
      return false;
    }
    if(username.length < 3){
      toast.error("Username is too short.." , toastOptions);
      return false;
    }
    if(password.length < 8){
      toast.error("Password is too short.." , toastOptions);
      return false;
    }
    if(email === ""){
      toast.error("Email cannot be empty" , toastOptions);
      return false;
    }
    return true;
  }
  const handleChange = (e) =>{
    setValue({...Value, [e.target.name] : e.target.value });
  }
  return (
    <>
      <div
        className="container-fluid"
        style={{
          background: "linear-gradient(to top, #fbc2eb 0%, #a18cd1 100%)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          paddingLeft : "0%"
        }}
      >
        <div className="container signin-container">
          <div className="sign-image"></div>
          <div className="container reg-content" style={{ color: "white" }}>
            <h3>Registration Form</h3>
            <form action="" onSubmit={(event)=>{
              handleSubmit(event);
            }} style={{width : "100%" , display : "flex" , alignItems : "center" , flexDirection : "column" , marginBottom : "20px"}} >
              <div className="mb-3 form-input">
                <input
                  type="text"
                  className="form-controll"
                  name="username"
                  placeholder="Username"
                  onChange={(e)=>{
                    handleChange(e);
                  }}
                />
              </div>
              <div className="mb-3 form-input">
                <input
                  type="email"
                  className="form-controll"
                  name="email"
                  placeholder="Email Address" 
                  onChange={(e)=>{
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
                  onChange={(e)=>{
                    handleChange(e);
                  }}
                />
              </div>
              <div className="mb-3 form-input">
                <input
                  type="password"
                  className="form-controll"
                  name="confirmPassword"
                  placeholder="Confirm Password" 
                  onChange={(e)=>{
                    handleChange(e);
                  }}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3" >
                Submit
              </button>
              <p style={{paddingTop : "10px"}}>Already Logged In? <Link to= "/login" style={{textDecoration : "none"}} >Login.</Link></p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}

export default Register;
