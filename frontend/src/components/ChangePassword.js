import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "../api/axios";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,24}$/;
const emailRegex = /^\S+@\S+\.\S+$/;

const ChangePassword = () => {
  // focus user input
  //const userRef = useRef();
  // focus error msg
  const errRef = useRef();
  const { token } = useParams()

  // all variables for the form, and the functions that change them
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
  //useEffect(() => {
  //  userRef.current.focus();
  //}, []);

  // clear error message on username, password, email, or passwordMatch change
  useEffect(() => {
    if (checkEmailMsg === false) {
      setRegMsg("");
    }
  }, [password, email, passwordMatch, checkEmailMsg]);

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
        `/api/changepassword/${token}`,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      //clear the form if no errors have been caught
      if (response) {
        setPassword("");
        setEmail("");
        setPasswordMatch("");
        setCheckEmailMsg(true);
        setRegMsg("Password changed successfully.");
        errRef.current.focus();
      }
    } catch (err) {
      setCheckEmailMsg(false);
      if (!err?.response) {
        setRegMsg("No Server Response.");
      } else if (err.response?.status === 400) {
        setRegMsg(err.response.data.toString()+".");
      } else {
        setRegMsg("Password Change Failed.");
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
      <div className="front">
        <p ref={errRef} className={regMsgClassName} aria-live="assertive">
          {regMsg}
        </p>

        <h2 className="form-title">Password Change</h2>

        <form className="form" onSubmit={handleRegister}>
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

          <button
            disabled={
              !validPassword ||
              !validEmail ||
              !validPasswordMatch
                ? true
                : false
            }>
            Save
          </button>
          <a className="link center-link fs-300" href="/login">
          Already have an account?
        </a>
        </form>
      </div>
      <div className="back"></div>
    </div>
  );
};

export default ChangePassword;