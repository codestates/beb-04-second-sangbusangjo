import axios from 'axios';
import React, {Component, useState} from 'react'
import { Link } from 'react-router-dom';
import "./LoginRegister.css"

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

export default function Login({handleResponseSuccess}) {
//   const [id, setId] = useState("");
//   const [password, setPassword] = useState(""); 
  const [loginInfo, setLoginInfo] = useState({
      email: '',
      password: ''
  });
  // const [errorMessage, setErrorMessage] = useState('');
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value});
  };
  

  const handleLogin = () => {
    if (loginInfo.email == '' || loginInfo.password == ''){
        alert('none data entered or wrong data');
    }else{
        axios.post('https://localhost:3000/login', {
            email: loginInfo.email,
            password: loginInfo.password,
        }).then((res) => {
            if(handleResponseSuccess != undefined){
                handleResponseSuccess();
            }
            
            
        }).catch((err) => {
            console.log('11');
        })
    }
  }


  

  
    return (
    
      <div class="loginregister">
        <form onSubmit={(e) => e.preventDefault()}>
                  <div class='logincontent'>
        SangbusangJo community

        </div>
            <div>
                
                <input name="email"
                type="email" 
                placeholder="email" 
                // value={this.state.email} 
                onChange={(e) => handleInputValue('email')} 
                class="loginregister__input"/>
                </div>
            <div>
                <input name="password" 
                type="password" 
                placeholder="PASSWORD"
                // value={this.state.password} 
                onChange={handleInputValue('password')} 
                class="loginregister__input"/></div>
                <Link to='/signup'>
                    <div className='signup'>You dont have account?</div>
                    </Link>
            <div>
                <button type="submit" onClick={handleLogin} class="loginregister__button">Login</button>
                    </div>
                    
                    {/* <div className='alert-box'> {errorMessage} </div> */}
            
        </form>
      </div>
      
    );
  }

