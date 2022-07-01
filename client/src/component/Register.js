import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./LoginRegister.css";

axios.defaults.withCredentials = true;

export default function Register() {
  const [userinfo, setUserinfo] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const history = useNavigate();
  const handleInputValue = (key) => (e) => {
    setUserinfo({ ...userinfo, [key]: e.target.value });
  };

  const handleSignup = () => {
    if (
      userinfo.userName !== "" &&
      userinfo.email !== "" &&
      userinfo.password !== ""
    ) {
      axios
        .post("https://localhost:4000/account/signUp", {
          email: userinfo.email,
          userName: userinfo.userName,
          password: userinfo.password,
        })
        .then(() => {
          history.push("/");
        })
        .catch((err) => {
          alert("wrong data");
          console.log(userinfo);
        });
    } else {
      setErrorMessage("all contents are required");
      console.error(errorMessage);
    }
  };
  return (
    <div class="loginregister">
      <form on onSubmit={(e) => e.preventDefault()}>
        <div>
          <input
            name="name"
            type="text"
            placeholder="USER NAME"
            value={userinfo.userName}
            onChange={handleInputValue("userName")}
            class="loginregister__input"
          />
        </div>
        <div>
          <input
            name="email"
            type="email"
            placeholder="EMAIL"
            value={userinfo.email}
            onChange={handleInputValue("email")}
            class="loginregister__input"
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="PASSWORD"
            value={userinfo.password}
            onChange={handleInputValue("password")}
            class="loginregister__input"
          />
        </div>
        <div class="signup">
          <Link to="/login">already have an account?</Link>
        </div>
        <button
          type="submit"
          onClick={handleSignup}
          class="loginregister__button"
        >
          Register account
        </button>
        <div className="alert">{errorMessage}</div>
      </form>
    </div>
  );
}
