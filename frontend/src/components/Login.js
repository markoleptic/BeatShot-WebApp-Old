import React, { useRef, useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthProvider";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setAuth, setPersist } = useAuthContext();
  // focus user input
  const userRef = useRef();
  // focus error
  const errRef = useRef();

  const navigate = useNavigate();

  // all variables for the form, and the functions that change them
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [checked, setChecked] = useState(false);

  // sets the userRef to what the user is currently focusing
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // clear error message on username, password, email change
  useEffect(() => {
    setErrMsg("");
  }, [username, password, email]);

  // called when the Login button is clicked
  const handleLogin = async (e) => {
    // prevents default behavior of reloading the page
    e.preventDefault();
    // use try/catch for async/await
    try {
      const response = await axios.post(
        "/api/login",
        JSON.stringify({ username, email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      //clear the form if no errors have been caught
      if (response) {
        const accessToken = response.data?.accessToken;
        setAuth({ username, accessToken });
        setUsername("");
        setEmail("");
        setPassword("");
        navigate(`/profile/${username}`);
      }
    } catch (err) {
      if (!err?.response) {
        console.log(err.response);
        setErrMsg("No Server Response.");
      } else if (
        err.response.data.toString() === "not confirmed"
      ) {
        setErrMsg("Please confirm your email or request for a resend.");
      } else if (err.response?.status === 400) {
        console.log(err.response.data.toString())
        setErrMsg("Missing Username/Email or Password.");
      } else if (err.response?.status === 401) {
        console.log(Object.values(err.response.data)[0].toString())
        setErrMsg("Invalid Username, Email, or Password.");
      } else {
        setErrMsg("Login Failed.");
      }
      errRef.current.focus();
    }
  };

  // update persist state on checkbox change
  const handlePersistCheckbox = () => {
    setChecked(!checked);
    setPersist(!checked);
    localStorage.setItem("persist", !checked);
  };

  return (
    <div className="form-container">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive">
        {errMsg}
      </p>

      <h2 className="form-title">Sign In</h2>
      <p className="fs-100 text-lightgrey">
        Automatically save your scores in the cloud and gain access to visual
        analysis of every aspect of your play.
      </p>
      <form className="form" onSubmit={handleLogin}>
        <label className="form-label" htmlFor="username">
          Username:
        </label>
        <input
          className="form-text"
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="form-label" htmlFor="email">
          Email:
        </label>
        <input
          className="form-text"
          type="email"
          id="email"
          placeholder="icantaim@beatshot.gg"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="form-label" htmlFor="password">
          Password:
        </label>
        <input
          className="form-text"
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />

        <div className="persistCheck">
          <input
            className="form-text"
            type="checkbox"
            id="persist"
            checked={checked}
            onChange={handlePersistCheckbox}
          />
          <label className="fa fs-200" htmlFor="persist">
            <span className="button-text">Trust This Device</span>
          </label>
        </div>

        <button>Login</button>

        <a className="link center-link fs-300" href="/register">
        Don't have an account?
      </a>

      <a className="link center-link fs-300" href="/recover">
        Forgot Password?
      </a>

      </form>
    </div>
  );
};

export default Login;
