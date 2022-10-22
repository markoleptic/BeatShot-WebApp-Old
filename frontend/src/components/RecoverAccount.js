import React, { useRef, useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthProvider";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const emailRegex = /^\S+@\S+\.\S+$/;

const RecoverAccount = () => {
  // const { setAuth, setPersist } = useAuthContext();
  // focus user input
  //const userRef = useRef();
  // focus error
  const errRef = useRef();

  // all variables for the form, and the functions that change them
  const [regMsg, setRegMsg] = useState("");
  const [successMsg, setSuccessMessage] = useState(false);
  const [regMsgClassName, setRegMsgClassName] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  // sets the userRef to what the user is currently focusing
  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  /* anytime the user changes the email field,
   * it automatically updates the email state,
   * and checks if it passes regex test */
  useEffect(() => {
    const result =
      document.getElementById("email").checkValidity() &&
      emailRegex.test(email);
    setValidEmail(result);
  }, [email]);

  // clear error message on username, password, email change
  useEffect(() => {
    setRegMsg("");
  }, [email]);

  const handleConfirmationEmail = async (e) => {
    // prevents default behavior of reloading the page
    e.preventDefault();
    // use try/catch for async/await
    try {
      const response = await axios.post(
        "/api/resendconfemail",
        JSON.stringify({ email }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      //clear the form if no errors have been caught
      if (response) {
        setSuccessMessage(true);
        setRegMsg("Email sent! Please check your inbox.");
        errRef.current.focus();
      }
    } catch (err) {
      if (!err?.response) {
        console.log(err.response);
        setRegMsg("No Server Response.");
      } else if (err.response?.status === 400) {
        setRegMsg("Missing email.");
      } else if (err.response?.status === 401) {
        setRegMsg("A user with that email does not exist.");
      } else {
        setRegMsg("Email failed to send.");
      }
      errRef.current.focus();
    }
  };

  // called when the Login button is clicked
  const handlePasswordChange = async (e) => {
    // prevents default behavior of reloading the page
    e.preventDefault();
    // use try/catch for async/await
    try {
      const response = await axios.post(
        "/api/recoveraccount",
        JSON.stringify({ email }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      //clear the form if no errors have been caught
      if (response) {
        setSuccessMessage(true);
        setRegMsg("Email sent! Please check your inbox.");
        errRef.current.focus();
      }
    } catch (err) {
      if (!err?.response) {
        console.log(err.response);
        setRegMsg("No Server Response.");
      } else if (err.response.data.toString() === "not confirmed") {
        setRegMsg(
          "Please confirm your email before requesting to change your password."
        );
      } else if (err.response?.status === 400) {
        setRegMsg("Missing email.");
      } else if (err.response?.status === 401) {
        setRegMsg("A user with that email does not exist.");
      } else {
        setRegMsg("Login Failed.");
      }
      errRef.current.focus();
    }
  };

  useEffect(() => {
    const handleRegisterMsg = () => {
      if (successMsg === true) {
        setRegMsgClassName("checkEmailMsg");
      } else if (regMsg !== "") {
        setRegMsgClassName("errmsg");
      } else {
        setRegMsgClassName("none");
      }
    };
    handleRegisterMsg();
  }, [regMsg, successMsg]);

  return (
    <div className="form-container">
      <p ref={errRef} className={regMsgClassName} aria-live="assertive">
        {regMsg}
      </p>

      <h2 className="form-title">Account Recovery</h2>

      <p className="fs-100 text-lightgrey">
        Enter your email and a link to create a new password or confirm your
        email will be sent to you.
      </p>

      <form className="form">
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

        <button
          disabled={!validEmail ? true : false}
          className="button-recover"
          onClick={handlePasswordChange}>
          Send Password Recovery Link
        </button>
        <button 
        disabled={!validEmail ? true : false}
        className="button-recover"
        onClick={handleConfirmationEmail}
        >
          Resend Email Confirmation Link
        </button>
        <a className="link text-white hover-blue fs-300" href="/register">
          Don't have an account?
        </a>
      </form>
    </div>
  );
};

export default RecoverAccount;
