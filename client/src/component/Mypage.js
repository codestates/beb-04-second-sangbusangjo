import axios from "axios";
import React, { Component } from "react";

class Mypage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    this.accessTokenRequest = this.accessTokenRequest.bind(this);
    this.refreshTokenRequest = this.refreshTokenRequest.bind(this);
  }

  async accessTokenRequest() {

    try{
        const result = await axios({
            method: "get",
            url: "https://localhost:3000/accesstoken",/*accesstoken 받아온 주소*/
            headers: {
                accept: "application/json",
                authorization: `Bearer ${this.props.accesToken}`,
            },
            withCredentials: true,
        });
        const { id, email, password, confirmPassword} = result.data.data.userdata; /*받아온 유저정보 */
        this.setState({ id, email, password, confirmPassword });
    }catch(err){
        alert(err);
    }
  }

  async refreshTokenRequest() {
    try {
        const result = await axios({
            method: "get",
            url: "https://localhost:3000/refreshtoken",/*refreshtoken 받아온 주소*/
            headers: {
                accept: "application/json",
            },
            withCredentials: true,
        });
        const { id, email, password, confirmPassword } = result.data.data.userdata;
        this.setState({ id, email, password, confirmPassword });
        this.props.problemAccessToken(result.data.data.accesToken);
    }catch(err){
        alert(err);
    }
  }

  render() {
    const { id, email, password, confirmPassword} = this.state;
    return (
        <div className="mypagecontainer">

        </div>
        
    );
  }
}
export default Mypage;