import React, { useState } from "react";

function App() {
  
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [emailReg, setEmailReg] = useState("");

//  let homePage = async () => {
//    const response = await fetch("/");
//    const data = await response.json();
//    setItems(data);
//  };

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
  };

  return (
    <React.Fragment>
      <head>
        <meta charset="utf-8" />
        <title>BeatShot: the rhythm-based aim trainer</title>
        <meta
          name="description"
          content="BeatShot is a free-to-play rhythm-based aim trainer coming soon to Steam."
        />
      </head>
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
      </body>
    </React.Fragment>
  );
}

export default App;
