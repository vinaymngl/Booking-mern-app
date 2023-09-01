import axios from "axios";
import { useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import "./login.css";
import {GoogleLogin} from "react-google-login";
 const GOOGLE_CLIENTID= "641466764873-he3foed6lqms8jfcfq0isp8p6de61pe6.apps.googleusercontent.com";
const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const onSuccess = (res)=>{
    console.log("LOGIN success! current user:",res.profileObj)
  }

  const onFailure = (res)=>{
    console.log("LOGIN failure!:",res)
  }


  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        <GoogleLogin
        clientId={GOOGLE_CLIENTID}
        buttonText="Login with GOOGLE"
        onSuccess={onSuccess}
        onFailure = {onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn = {false}
        />
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;