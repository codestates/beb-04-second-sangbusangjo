import React, { useState } from "react";
import "./Home.css";
import PostView from "./PostView";
import { Link } from "react-router-dom";
import dummy from "../db/data.json";

function PostList() {
  const [postList, setPostList] = useState(dummy.posts);

  return (
    <div className="board_wrap">
      <div className="board_title">
        <h2>Community</h2>
        <p>게시물을 올리고 토큰을 받으세요!</p>
      </div>
      <div>
        <div className="board_list_wrap">
          <div className="board_list">
            <div className="top">
              <div className="num">번호</div>
              <div className="post_title">제목</div>
              <div className="writer">작성자</div>
              <div className="date">작성일</div>
              <div className="view">조회수</div>
            </div>

            {postList.map((post) => (
              // dummy.map 이 아니라 dummy.posts.map!!
              <div key={post.num}>
                <div className="num">{post.num}</div>
                <div className="post_title">
                  <Link to="/postview">{post.title}</Link>
                </div>
                <div className="writer">{post.writer}</div>
                <div className="date">{post.date}</div>
                <div className="view">{post.view}</div>
              </div>
            ))}
          </div>
          <div className="board_page">
            <a href="#" className="bt prev">
              ◁
            </a>
            <a href="#" className="num on">
              1
            </a>
            <a href="#" className="num">
              2
            </a>
            <a href="#" className="num">
              3
            </a>
            <a href="#" className="num">
              4
            </a>
            <a href="#" className="num">
              5
            </a>
            <a href="#" className="bt next">
              ▷
            </a>
          </div>
          <div className="bt_wrap">
            <Link to="/postwrite" className="on">
              등록
            </Link>
            {/* <a href="#">수정</a> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostList;
