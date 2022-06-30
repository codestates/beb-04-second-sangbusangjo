import React from "react";
import { Link } from "react-router-dom";

function PostWrite() {
  return (
    <div className="board_wrap">
      <div className="board_title">
        <h2>Community</h2>
        <p>게시물을 올리고 토큰을 받으세요!</p>
      </div>
      <div>
        <div className="board_write_wrap">
          <div className="board_write">
            <div className="title">
              <dl>
                <dt>제목</dt>
                <dd>
                  <input type="text" placeholder="제목 입력"></input>{" "}
                </dd>
              </dl>
            </div>
            <div className="cont">
              <textarea placeholder="내용을 입력해주세요"></textarea>
            </div>
          </div>

          <div className="bt_wrap">
            <Link to="/postlist" className="on">
              등록
            </Link>
            <Link to="/postlist">취소</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostWrite;
