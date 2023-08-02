import { useState } from "react";
import axios from "axios";

function PostCreate() {
  const [title, setTitle] = useState("");
  const handleCreate = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/posts", { title: title });
    setTitle("");
  };
  return (
    <div className="container">
      <h2>Create Post</h2>
      <form onSubmit={handleCreate} className="">
        <label className="m-2">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="m-2 input-group "
        ></input>
        <button className="btn btn-success m-2 p-1">Create</button>
      </form>
    </div>
  );
}

export default PostCreate;
