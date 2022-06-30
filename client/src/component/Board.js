import React, { useEffect, useState } from "react";

function Board() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    // axios;
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <>asdas</>
      ))}
    </div>
  );
}

export default Board;
