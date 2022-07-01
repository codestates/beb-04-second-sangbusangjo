import axios from "axios";
import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import "./LoginRegister.css";
import { login } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

axios.defaults.withCredentials = true;

// class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: "",
//       password: "",
//     };
//     this.inputHandler = this.inputHandler.bind(this);
//     this.loginRequestHandler = this.loginRequestHandler(this);
//   }

//   inputHandler(e) {
//     this.setState({ [e.target.name]: e.target.value });
//   }
//   async loginRequestHandler() {
//     const { email, password } = this.state;
//     try {
//       const result = await axios({
//         method: "post",
//         url: "https://localhost:3000/login",
//         headers: {
//           accept: "application/json",
//         },
//         withCredentials: true,
//         data: { email, password },
//       });

//       this.props.loginHandler(result.data);
//     }catch(err) {
//       alert(err);
//     }
//   }

export default function Login({ handleResponseSuccess }) {
  //   const [id, setId] = useState("");
  //   const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies();

  const [loginState, setloginState] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  // const [errorMessage, setErrorMessage] = useState('');
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
    // console.log(e.target.value);
  };

  const handleLogin = async () => {
    console.log("loginnnn");
    if (loginInfo.email == "" || loginInfo.password == "") {
      alert("none data entered or wrong data");
      console.log(loginInfo);
    } else {
      try {
        const res = await axios.post("https://localhost:4000/account/signIn", {
          email: loginInfo.email,
          password: loginInfo.password,
        });
        if (res) {
          const token = cookies["jwt"];
          if (!token) throw new Error(`Unexpected cookie`);

          const payload = jwt_decode(token);
          if (!payload) throw new Error(`Invalid json web token`);

          setCookie("userInfo", payload);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div class="loginregister">
      <form onSubmit={(e) => e.preventDefault()}>
        <div class="logincontent">SangbusangJo community</div>
        <div>
          <input
            name="email"
            type="email"
            placeholder="E-MAIL"
            // value={this.state.email}
            onChange={handleInputValue("email")}
            class="loginregister__input"
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="PASSWORD"
            // value={this.state.password}
            onChange={handleInputValue("password")}
            class="loginregister__input"
          />
        </div>
        <Link to="/signup">
          <div className="signup">You dont have account?</div>
        </Link>
        <div>
          <button
            type="submit"
            onClick={handleLogin}
            class="loginregister__button"
          >
            Login
          </button>
        </div>

        {/* <div className='alert-box'> {errorMessage} </div> */}
      </form>
    </div>
  );
}
