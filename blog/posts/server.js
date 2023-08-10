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

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };
  await axios
    .post("http://eventbus-srv:5005/events", {
      type: "PostCreated",
      data: {
        id,
        title,
      },
    })
    .catch((err) => {
      console.log(err.message);
    });
  res.status(201).json(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Event Received:", req.body.type);
  res.send({});
});
app.listen(5000, () => {
  console.log("posts service is running on port 5000");
});
