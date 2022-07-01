import React from "react";
import { Link, useParams } from "react-router-dom";
import Comment from "../component/Comment";
import { useEffect, useState } from "react";

function PostView() {
  const [postContent, setPostContent] = useState([]);

  let { id } = useParams();

  const getPostView = async () => {
    let url = `https://localhost:4000/board/${id}`;
    let response = await fetch(url);
    let data = await response.json();
    let postcontent = data.data;
    console.log(postcontent);
    setPostContent(postcontent);
  };

  useEffect(() => {
    getPostView();
  }, []);

  return (
    <div className="board_wrap">
      <div className="board_title">
        <h2>Community</h2>
      </div>
      <div>
        <div className="board_view_wrap">
          <div className="board_view">
            <div className="title">{postContent.title}</div>
            <div className="info">
              <dl>
                <dt>번호</dt>
                <dd>{postContent.id}</dd>
              </dl>
              <dl>
                <dt>작성자</dt>
                <dd>{postContent.userName}</dd>
              </dl>
              <dl>
                <dt>작성일</dt>
                <dd>{postContent.createdAt}</dd>
              </dl>
              <dl>
                <dt>조회수</dt>
                <dd>{postContent.hit}</dd>
              </dl>
            </div>
            <div className="cont">{postContent.content}</div>
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
