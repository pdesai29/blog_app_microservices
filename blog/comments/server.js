const express = require("express");
const cors = require("cors");
const axios = require("axios");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const app = express();

app.use(bodyParser.json());
app.use(cors());
//app.use(morgan("short"));

const comments = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(comments[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { content } = req.body;
  comments[req.params.id]
    ? comments[req.params.id].push({ content, id, status: "pending" })
    : (comments[req.params.id] = [{ content, id, status: "pending" }]);

  await axios
    .post("http://localhost:5005/events", {
      type: "CommentCreated",
      data: {
        id,
        content,
        postId: req.params.id,
        status: "pending",
      },
    })
    .catch((err) => {
      console.log(err.message);
    });

  res.status(201).json({ content, id });
});

app.post("/events", async (req, res) => {
  console.log("Event Received:", req.body.type);
  const { type, data } = req.body;
  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;
    const commentsByPostId = comments[postId];
    const commentToModerate = commentsByPostId.find(
      (comment) => comment.id === id
    );
    commentToModerate.status = status;

    await axios.post("http://localhost:5005/events", {
      type: "CommentUpdated",
      data: {
        id,
        content,
        postId,
        status,
      },
    });
  }

  res.send({});
});
app.listen(5001, () => {
  console.log("comments service is running on port 5001");
});
