import PostList from "./Components/PostList";
import PostCreate from "./Components/PostCreate";
import "./App.css";

function App() {
  return (
    <>
      <div className="container">
        <h1>The Blog App</h1>
        <hr></hr>
        <PostCreate />
        <hr></hr>
        <h2>Posts</h2>
        <PostList title={"title"} />
      </div>
    </>
  );
}

export default App;
