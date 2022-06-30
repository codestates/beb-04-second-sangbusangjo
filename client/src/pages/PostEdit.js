import React from "react";
import { Link } from "react-router-dom";

function PostEdit() {
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
                  <input type="text" placeholder="제목 입력"></input>
                  {/* DB에서 제목 불러오기 */}
                </dd>
              </dl>
            </div>
            <div className="cont">
              <textarea placeholder="내용을 입력해주세요"></textarea>
              {/* DB에서 내용 불러오기 */}
            </div>
          </div>

          <div className="bt_wrap">
            <Link to="/postview" className="on">
              등록
            </Link>
            {/* 내용 저장시키고 그 게시물 뷰로 이동 */}
            <Link to="/postview">취소</Link>
            {/* 그 게시물 뷰로 이동 */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostEdit;
