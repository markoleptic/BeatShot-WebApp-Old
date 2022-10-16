import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
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

  const [checkEmailMsg, setCheckEmailMsg] = useState(false);
  const [regMsg, setRegMsg] = useState("");
  const [regMsgClassName, setRegMsgClassName] = useState("");

  // sets the userRef to what the user is currently focusing
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // clear error message on username, password, email, or passwordMatch change
  useEffect(() => {
    if (checkEmailMsg === false) {
      setRegMsg("");
    }
  }, [username, password, email, passwordMatch, checkEmailMsg]);

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
        setCheckEmailMsg(true);
        setRegMsg("Email sent! Please check your inbox.");
        errRef.current.focus();
      }
    } catch (err) {
      setCheckEmailMsg(false);
      if (!err?.response) {
        setRegMsg("No Server Response.");
      } else if (err.response?.status === 400) {
        setRegMsg(Object.values(err.response.data)[0].toString()+".");
      } else {
        setRegMsg("Registration Failed.");
      }
      errRef.current.focus();
    }
  };

  useEffect(() => {
    const handleRegisterMsg = () => {
      if (checkEmailMsg === true) {
        setRegMsgClassName("checkEmailMsg");
      } else if (regMsg !== "") {
        setRegMsgClassName("errmsg");
      } else {
        setRegMsgClassName("none");
      }
    };
    handleRegisterMsg();
  }, [regMsg, checkEmailMsg]);

  return (
    <div className="form-container">

        <p ref={errRef} className={regMsgClassName} aria-live="assertive">
          {regMsg}
        </p>

        <h2 className="form-title">Create an Account</h2>
        <p className="fs-100 text-lightgrey">
          Automatically save your scores in the cloud and gain access to visual
          analysis of every aspect of your play.
        </p>

        <form className="form" onSubmit={handleRegister}>
        <div className="label-input-container">
          <label className="form-label" htmlFor="username">
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
            className="form-text"
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
                : "hide"
            }>
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 24 characters. <br />
          </p>
          </div>

          <div className="label-input-container">
          <label className="form-label" htmlFor="email">
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
            className="form-text"
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
            }>
            <FontAwesomeIcon icon={faInfoCircle} />
            Must be a valid email. <br />
          </p>
          </div>

          <div className="label-input-container">
          <label className="form-label" htmlFor="password">
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
            className="form-text"
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
            }>
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters.
            <br />
            Must include an uppercase letter, lowercase letter, and a number.
          </p>
          </div>

          <div className="label-input-container">
          <label className="form-label" htmlFor="passwordMatch">
            Re-enter Password:
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
            className="form-text"
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
            }>
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first password input field.
          </p>
          </div>

          <button
            disabled={
              !validUsername ||
              !validPassword ||
              !validEmail ||
              !validPasswordMatch
                ? true
                : false
            }>
            Sign Up
          </button>
          <a className="link center-link fs-300" href="/login">
          Already have an account?
        </a>
        </form>
    </div>
  );
};

export default Register;
