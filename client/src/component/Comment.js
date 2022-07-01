import React from "react";

function Comment() {
  return (
    <div className="comment_wrap">
      <div className="comment_list">
        <div className="comment">
          <div>댓글 내용입니다.</div>
          <div> -작성자 이름</div>
        </div>
        <div className="comment">
          <div>댓글 내용입니다.</div>
          <div> -작성자 이름</div>
        </div>
        <div className="comment">
          <div>댓글 내용입니다.</div>
          <div> -작성자 이름</div>
        </div>
      </div>
      <div className="comment_input">
        <textarea placeholder="댓글을 입력하세요" />
        <button className="comment_input_btn">댓글 쓰기</button>
      </div>
    </div>
  );
}

export default Comment;
