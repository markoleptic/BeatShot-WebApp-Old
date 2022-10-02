import React, { useState } from "react";

function App() {
  
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [errorReg, setErrorReg] = useState();

  let register = async () => {
    const response = await fetch("/register", {
      method: "post",
      body: JSON.stringify({
        username: usernameReg,
        email: emailReg,
        password: passwordReg,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setErrorReg(JSON.stringify(data));

  };

  let login = async () => {
    const response = await fetch("/login", {
      method: "post",
      body: JSON.stringify({
        username: usernameReg,
        email: emailReg,
        password: passwordReg,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setErrorReg(JSON.stringify(data));
  };

  return (
    <React.Fragment>
      <body>
        <h1>Registration</h1>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <label>Email</label>
        <input
          type="text"
          onChange={(e) => {
            setEmailReg(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="text"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <button onClick={register}> Register </button>
        <button onClick={login}> Login </button>
        <p>{errorReg}</p>
      </body>
    </React.Fragment>
  );
}

export default App;
