import React, { useRef, useState, useEffect } from "react";
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import useRefreshToken from '../hooks/useRefreshToken'
const LOGIN_URL = '/api/login';


const Login = () => {
  const { setAuth } = useAuth();
  //const userRef = useRef();
  //const errRef = useRef();
  const refresh = useRefreshToken();


  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");

  let register = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      //credentials: 'include',
      body: JSON.stringify({
        username: user,
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    setErrMsg(JSON.stringify(data));
  };

  // let login = async () => {
  //   try {
  //     const response = await fetch("/api/login", {
  //       method: "post",
  //       headers: { "Content-Type": "application/json" },
  //       credentials: "include",
  //       body: JSON.stringify({
  //         username: user,
  //         email: email,
  //         password: password,
  //       }),
  //     });
  //     console.log(JSON.stringify(response?.data));
  //     const accessToken = response?.data?.accessToken;
  //   } catch (err) {
  //     //setErrorReg(JSON.stringify(response.json()));
  //     if (!err?.response) {
  //       setErrMsg("No Server Response");
  //     } else if (err.response?.status === 400) {
  //       setErrMsg("Missing Username or Password");
  //     } else if (err.response?.status === 401) {
  //       setErrMsg("Unauthorized");
  //     } else {
  //       setErrMsg("Login Failed");
  //     }
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("/api/login",
            JSON.stringify({ username: user, email, password }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        const accessToken = response?.data?.accessToken;
        //const roles = response?.data?.roles;
        setAuth({ username: user, password, accessToken });
        setUser('');
        setPassword('');
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Login Failed');
        }
        //errRef.current.focus();
    }
}

  return (
    <>
      <h2>Login</h2>
      <label>Username</label>
      <input
        type="text"
        onChange={(e) => {
          setUser(e.target.value);
        }}
      />
      <label>Email</label>
      <input
        type="text"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <label>Password</label>
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={register}> Register </button>
      <button onClick={handleLogin}> Login </button>
      <button onClick={refresh}> Login </button>
      <p>{errMsg}</p>
    </>
  );
}

export default Login;
