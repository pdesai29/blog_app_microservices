const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
// app.use(morgan("short"));
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    await axios
      .post("http://localhost:5005/events", {
        type: "CommentModerated",
        data: {
          id: data.id,
          postId: data.postId,
          status,
          content: data.content,
        },
      })
      .catch((err) => console.log(err.message));
  }
  res.send({});
});

app.listen(5003, () => {
  console.log("Moderation service is running on port 5003");
});
