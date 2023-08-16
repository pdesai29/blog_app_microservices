import { useState } from "react";
import axios from "axios";

function CommentCreate({ postId }) {
  const [content, setContent] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://posts.com/posts/${postId}/comments`, {
      content,
    });
    setContent("");
  };
  return (
    <div className="container align-items-center">
      <form onSubmit={handleSubmit}>
        <label className="m-2">Create Comment : </label>
        <input
          className="m-2"
          type="text"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></input>
        <button className="btn btn-success p-1 m-2">Create Comment</button>
      </form>
    </div>
  );
}

export default CommentCreate;
