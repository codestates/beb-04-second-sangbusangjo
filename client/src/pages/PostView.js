import React from "react";
import { Link } from "react-router-dom";
import Comment from "../component/Comment";

function PostView() {
  return (
    <div className="board_wrap">
      <div className="board_title">
        <h2>Community</h2>
      </div>
      <div>
        <div className="board_view_wrap">
          <div className="board_view">
            <div className="title">글 제목</div>
            <div className="info">
              <dl>
                <dt>번호</dt>
                <dd>1</dd>
              </dl>
              <dl>
                <dt>작성자</dt>
                <dd>제훈</dd>
              </dl>
              <dl>
                <dt>작성일</dt>
                <dd>22.06.25</dd>
              </dl>
              <dl>
                <dt>조회수</dt>
                <dd>1</dd>
              </dl>
            </div>
            <div className="cont">글내용</div>
          </div>
          <div>
            <Comment />
          </div>
          <div className="bt_wrap">
            <Link to="/postlist" className="on">
              목록
            </Link>
            {/* 리스트 페이지로 이동하게 */}
            <Link to="/postedit">수정</Link>
            {/* edit 페이지로 이동하게 */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostView;
