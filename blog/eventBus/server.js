const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());

//app.use(morgan("short"));
const events = [];

app.post("/events", async (req, res) => {
  const event = req.body;
  console.log("Event Received:", event.type);
  events.push(event);

  axios.post("http://posts-clusterip-srv:5000/events", event).catch((err) => {
    console.log(err.message);
  });
  axios
    .post("http://comments-clusterip-srv:5001/events", event)
    .catch((err) => {
      console.log(err.message);
    });
  axios.post("http://query-clusterip-srv:5002/events", event).catch((err) => {
    console.log(err.message);
  });
  axios
    .post("http://moderation-clusterip-srv:5003/events", event)
    .catch((err) => {
      console.log(err.message);
    });

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(5005, () => {
  console.log("EventBus is running on port 5005");
});
