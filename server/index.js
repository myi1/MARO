const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
require("dotenv").config();
const images = require("./routes/images");

const { PORT, BACKEND_URL } = process.env;
const port = PORT || 8080;

app.use((req, res, next) => {
  const path = req.path;
  console.log(`${getTimestamp()}: Request ${req.method} received to ${path}`);
  next();
});

app.use("/public", express.static("public"));

app.use("/images", images);

app.listen(port, () =>
  console.log(`${getTimestamp()}: Server started at ${BACKEND_URL}:${port}`)
);

// Helper Functions
function getTimestamp() {
  const unixTimeNow = new Date();
  const timestamp = unixTimeNow.toLocaleTimeString("it-IT");

  return timestamp;
}
