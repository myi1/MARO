const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const fs = require("fs");

router.route("/").get((req, res) => {
  res.json({
    message: "This is the response to the /images route ",
  });
});

module.exports = router;
