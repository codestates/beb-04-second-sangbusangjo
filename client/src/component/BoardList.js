import React from "react";
import { Link } from "react-router-dom";
import "../pages/Home.css";

function BoardList() {
  return (
    <div>
      <div className="num">번호</div>
      <div className="title">
        <Link to="/postview">제목</Link>
      </div>
      <div className="writer">작성자</div>
      <div className="date">작성일</div>
      <div className="view">0</div>
      {/* 클릭하면 조회수 올라가도록 해야함 */}
    </div>
  );
}

export default BoardList;
