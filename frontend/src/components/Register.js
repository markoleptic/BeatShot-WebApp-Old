import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const usernameRegex = /^[A-z][A-z0-9-_]{3,23}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,24}$/;
const emailRegex = /^\S+@\S+\.\S+$/;

const Register = () => {
  // focus user input
  const userRef = useRef();
  // focus error msg
  const errRef = useRef();

  // all variables for the form, and the functions that change them
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [passwordMatch, setPasswordMatch] = useState("");
  const [validPasswordMatch, setValidPasswordMatch] = useState(false);
  const [passwordMatchFocus, setPasswordMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  // sets the userRef to what the user is currently focusing
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // clear error message on username, password, email, or passwordMatch change
  useEffect(() => {
    setErrMsg("");
  }, [username, password, email, passwordMatch]);

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
    const match = password === passwordMatch;
    setValidPasswordMatch(match);
  }, [password, passwordMatch]);

  /* anytime the user changes the email field,
   * it automatically updates the email state,
   * and checks if it passes regex test */
  useEffect(() => {
    const result =
      document.getElementById("email").checkValidity() &&
      emailRegex.test(email);
    setValidEmail(result);
  }, [email]);

  // called when the Sign Up button is clicked
  const handleRegister = async (e) => {
    // prevents default behavior of reloading the page
    e.preventDefault();
    // use try/catch for async/await
    try {
      const response = await axios.post(
        "/api/register",
        JSON.stringify({ username, email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      //clear the form if no errors have been caught
      if (response) {
        setUsername("");
        setPassword("");
        setEmail("");
        setPasswordMatch("");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="form-container">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <h1>Register</h1>

      <form onSubmit={handleRegister}>
        <label htmlFor="username">
          Username:
          <FontAwesomeIcon
            icon={faSquareCheck}
            className={validUsername ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faSquareXmark}
            className={validUsername || !username ? "hide" : "invalid"}
          />
        </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          required
          aria-invalid={validUsername ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setUsernameFocus(true)}
          onBlur={() => setUsernameFocus(false)}
        />
        <p
          id="uidnote"
          className={
            usernameFocus && username && !validUsername
              ? "instructions"
              : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters. <br />
        </p>

        <label htmlFor="email">
          Email:
          <FontAwesomeIcon
            icon={faSquareCheck}
            className={validEmail ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faSquareXmark}
            className={validEmail || !email ? "hide" : "invalid"}
          />
        </label>
        <input
          type="email"
          id="email"
          placeholder="icantaim@beatshot.gg"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-invalid={validEmail ? "false" : "true"}
          aria-describedby="emailnote"
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />
        <p
          id="emailnote"
          className={
            emailFocus && email && !validEmail ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must be a valid email. <br />
        </p>

        <label htmlFor="password">
          Password:
          <FontAwesomeIcon
            icon={faSquareCheck}
            className={validPassword ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faSquareXmark}
            className={validPassword || !password ? "hide" : "invalid"}
          />
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          aria-invalid={validPassword ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
        />
        <p
          id="pwdnote"
          className={
            passwordFocus && !validPassword ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters.
          <br />
          Must include an uppercase letter, lowercase letter, and a number.
        </p>

        <label htmlFor="passwordMatch">
          Confirm Password:
          <FontAwesomeIcon
            icon={faSquareCheck}
            className={validPasswordMatch && passwordMatch ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faSquareXmark}
            className={
              validPasswordMatch || !passwordMatch ? "hide" : "invalid"
            }
          />
        </label>
        <input
          type="password"
          id="passwordMatch"
          onChange={(e) => setPasswordMatch(e.target.value)}
          value={passwordMatch}
          required
          aria-invalid={validPasswordMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => setPasswordMatchFocus(true)}
          onBlur={() => setPasswordMatchFocus(false)}
        />
        <p
          id="confirmnote"
          className={
            passwordMatchFocus && !validPasswordMatch
              ? "instructions"
              : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first password input field.
        </p>

        <button
          disabled={
            !validUsername ||
            !validPassword ||
            !validEmail ||
            !validPasswordMatch
              ? true
              : false
          }
        >
          Sign Up
        </button>
      </form>
      <p>
        Already have an account?
        <br />
        <Link className="text-link" to="/Login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
