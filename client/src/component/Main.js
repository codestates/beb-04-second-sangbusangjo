import React from "react";
import "./Main.css";
import { Link } from "react-router-dom";

function Main() {
  return (
    <div className="wrapper">
      <div className="container">
        <div className="contentWrapper">
          <div className="copyContainer">
            <div className="title">
              The Power　　　　　　　　　　　　　　　　　　　　
              <br />
              comes from
              <br />
              Communications.
            </div>
            <div className="description">Post a post and get a token!</div>
            {/* 👆 Opensea 홈페이지와 같은 문구 */}
            <div className="ctaContainer">
              <div className="Counter">
                <Link to="/postlist">Go to Board</Link>
              </div>
              {/* 👆 버튼 CSS */}
            </div>
          </div>
          <div>
            <img
              className="cardContainer"
              src="img/bitcoin.png"
              width="450"
              height="550"
              alt=""
              
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
