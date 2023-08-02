const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());
//app.use(morgan("short"));

const posts = {};

function handleEvent(type, data) {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    posts[postId].comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const comment = posts[postId].comments.find((comment) => comment.id === id);
    comment.status = status;
    comment.content = content;
  }
}

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log("Event Received:", type);
  handleEvent(type, data);
  res.send({});
});

app.listen(5002, async () => {
  console.log("query service is running on port 5002");
  try {
    const res = await axios.get("http://localhost:5005/events").catch((err) => {
      console.log("error");
    });

    for (let event of res.data) {
      console.log(event);
      console.log("Processing event:", event.type);
      handleEvent(event.type, event.data);
    }
  } catch (err) {
    console.log(err.message);
  }
});
