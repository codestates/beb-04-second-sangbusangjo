import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import PostList from "../pages/PostList";
import "./Nav.css";
import useUserInfo from "../hooks/useUserInfo";

function Nav() {
  const [{ token, username, email }, setUserInfo] = useUserInfo();
  console.log(token, username, email);
  return (
    <div className="wrapper">
      <Link to="/">
        <div className="logoContainer">
          <img
            src="img/bitcoin.png"
            width="35"
            height="35"
            alt="asd"
            // 👆 메인 페이지에 판매중인 이미지 띄우기
          />

          <div className="logoText">SangbusangJo</div>
        </div>
      </Link>
      {token !== undefined ? (
        <div className="headerItems">
          <div className="headerItem" onClick={() => setUserInfo({})}>
            Logout
          </div>
          <Link to="postlist" component={<PostList />}>
            <div>
              <a className="headerItem">
                토큰 수 {token} {username} / {email}
              </a>
            </div>
          </Link>

          <div className="none"></div>
        </div>
      ) : (
        <div className="headerItems">
          <Link to="/login" component={Login}>
            <div className="headerItem">Login</div>
          </Link>
          <Link to="postlist" component={<PostList />}>
            <div>
              <a className="headerItem">Board</a>
            </div>
          </Link>

          <div className="none"></div>
        </div>
      )}
    </div>
  );
}

export default Nav;
