import React, { useState, useContext } from "react";
import classes from "./SignIn.module.css";
import axios from "../../API/axiosConfig";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import Error from "../Error/Error";
const SignIn = ({ onToggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [isAuthorized, setIsAuthorized] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // First request: login
      const { data: loginData } = await axios.post("/user/login", {
        email,
        password,
      });
      console.log(loginData);
      // Saving the token in localStorage
      localStorage.setItem("token", loginData.token);

      const userResponse = await axios.get("/user/checkUser", {
        headers: { Authorization: `Bearer ${loginData.token}` },
      });
      console.log("User Details:", userResponse.data);

      setUser({
        username: userResponse.data.username,
        userid: userResponse.data.userid,
      });
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      setIsAuthorized("The email or password you entered is incorrect.");
    }
  };

  return (
    <div className={classes.login__Container}>
      <div className={classes.Text}>
        <h2>Login to your account</h2>
        <p>
          Don’t have an account?{" "}
          <a onClick={onToggleForm}>Create a new account</a>
        </p>
      </div>
      <form onSubmit={handleLogin}>
        <div className={classes.form__Group}>
          <input
            type="email"
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={classes.form__Group}>
          <div className={classes.password__Input}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className={classes.toggle__Password}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <VisibilityOutlinedIcon />
              ) : (
                <VisibilityOffOutlinedIcon />
              )}
            </button>
          </div>
        </div>
        {isAuthorized && <Error message={isAuthorized} />}

        <div className={classes.forgot__Password}>
          <a href="/forgot-password">Forgot password?</a>
        </div>
        <button type="submit" className={classes.login__Button}>
          Login
        </button>
      </form>
    </div>
  );
};

export default SignIn;
