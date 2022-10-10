import React, { useRef, useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthProvider";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

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
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  // update persist state on checkbox change
  const handlePersistCheckbox = () => {
    setChecked(!checked);
    setPersist(!checked);
    localStorage.setItem("persist", !checked);
  }

  return (
    <div className="form-container">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <h1>Sign In</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="icantaim@beatshot.gg"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button>Login</button>
        <div className="persistCheck">
          <input
            type="checkbox"
            id="persist"
            value={checked}
            onChange={handlePersistCheckbox}
          />
          <label htmlFor="persist">Trust This Device</label>
        </div>
      </form>
      <p>
        Don't have an account?
        <br />
        <Link className="text-link" to="/Register">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
