import { useState, useEffect } from "react";
import CommentList from "./CommentList";
import CommentCreate from "./CommentCreate";
import axios from "axios";

function PostList() {
  const [posts, setPosts] = useState({});

  const getPosts = async () => {
    const res = await axios.get("http://posts.com/posts");
    setPosts(res.data);
  };
  useEffect(() => {
    getPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        key={post.id}
        style={{ width: "30%", marginBottom: "20px" }}
      >
        <div className="card-body">
          <h3 className="">{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });
  return (
    <div className="d-flex flex-row flex-warp justify-content-between">
      {renderedPosts}
    </div>
  );
}

export default PostList;
