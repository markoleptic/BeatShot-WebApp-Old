import React, { useRef, useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthProvider";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const usernameRegex = /^[A-z][A-z0-9-_]{3,23}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,24}$/;
const emailRegex = /^\S+@\S+\.\S+$/;

const Login = () => {
  const { setAuth, setPersist } = useAuthContext();
  // focus user input
  const userRef = useRef();
  // focus error
  const errRef = useRef();

  let navigate = useNavigate();

  // all variables for the form, and the functions that change them
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [checked, setChecked] = useState(false);

  // sets the userRef to what the user is currently focusing
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // clear error message on username, password, email, or passwordMatch change
  useEffect(() => {
    setErrMsg("");
  }, [username, password, email]);

  /* anytime the user changes the username field,
   * it automatically updates the username state,
   * and checks if it passes regex test */
  useEffect(() => {
    setValidUsername(usernameRegex.test(username));
  }, [username]);

  /* anytime the user changes the password field,
   * it automatically updates the password state,
   * checks if it passes regex test, and if it
   * matches the second password (passwordMatch)*/
  useEffect(() => {
    const regexCheck = passwordRegex.test(password);
    setValidPassword(regexCheck);
  }, [password]);

  /* anytime the user changes the email field,
   * it automatically updates the email state,
   * and checks if it passes regex test */
  useEffect(() => {
    const result =
      document.getElementById("email").checkValidity() &&
      emailRegex.test(email);
    setValidEmail(result);
  }, [email]);

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
        const responseUsername = response.data.username;
        setAuth({username: responseUsername, accessToken });
        setUsername("");
        setEmail("");
        setPassword("");
        navigate(`/profile/${responseUsername}`);
      }
    } catch (err) {
      if (!err?.response) {
        console.log(err.response);
        setErrMsg("No Server Response.");
      } else if (err.response.data.toString() === "not confirmed") {
        setErrMsg("Please confirm your email or request for a resend.");
      } else if (err.response?.status === 400 || err.response?.status === 401) {
        setErrMsg(err.response.data);
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
        className={errMsg ? "errmsg" : "hide"}
        aria-live="assertive">
        {errMsg}
      </p>

      <h2 className="form-title">Sign In</h2>
      <p className="fs-100 text-lightgrey">
        Automatically save your scores in the cloud and gain access to visual
        analysis of every aspect of your play.
      </p>
      <p className="fs-100 text-light margin-top">
        You can use your username or email.
      </p>
      <form className="form" onSubmit={handleLogin}>

        <div className="label-input-container">
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
        </div>

        <div className="label-input-container">
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
        </div>

        <div className="label-input-container">
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
        </div>
        
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

        <button
          disabled={
            !validPassword || (!validEmail && !validUsername) ? true : false
          }>
          Login
        </button>

        <a className="link text-center text-white hover-blue fs-150" href="/register">
          Don't have an account?
        </a>

        <a className="link text-center text-white hover-blue fs-150" href="/recover">
          Forgot Password or need another confirmation link?
        </a>
      </form>
    </div>
  );
};

export default Login;
