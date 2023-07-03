import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "./SEO";

const EmailConfirmation = () => {
  const { token } = useParams()
  const [confirmationResult, setConfirmationResult] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    let isActive = true;
    if (isActive) {
      const sendRequest = async () => {
        try {
          const response = await axios.get(`/api/confirmation/${token}`);
          if (response?.status === 400) {
            setConfirmationResult("Something went wrong.");
          }
          if (response?.status === 200) {
            setConfirmationResult(
              "Email Successfully Verified. You will automatically be redirected to the login page."
            );
            setTimeout(() => {
              navigate("/login");
            },2000)
          }
          if (response?.status === 204) {
            setConfirmationResult("You have already verified your email. You will automatically be redirected to the login page.");
            setTimeout(() => {
              navigate("/login");
            },2000)
          }
        } catch (error) {
          if (error.response?.status === 400) {
            console.log('Bad request')
          }
          else {
            console.log(error.response);
          }
        }
      };
      sendRequest();
    }
    return () => {
      isActive = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
    <SEO title={"Confirm Email | BeatShot"} 
    type={"website"} 
    description={"the rhythm-based aim-trainer"} 
    url="/confirmation"
    />
    <div className="email-conf">
      <p>{confirmationResult}</p>
      <Link to={`/login`}>
        <button type="button">Sign in</button>
      </Link>
      </div>
    </>
  );
};
export default EmailConfirmation;
