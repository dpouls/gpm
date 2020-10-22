import React, { useState, useEffect } from "react";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import "./Login.scss";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    Axios.post("/auth/login", { username, password }).then((res) => {
        console.log(res.data)
        props.history.push("/portal")
    }
    );
    setUsername("");
    setPassword("");
    e.preventDefault();
  };

  return (
    <div className="login-page">
      <div className="login-modal-container">
        <div>WELCOME BACK</div>
        <form className='login-form' onSubmit={login}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <button type="submit">LOGIN</button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Login);
