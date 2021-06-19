const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const fs = require("fs");

router
  .route("/")
  .get((req, res) => {
    const imagesData = readImagesList();

    res.json(imagesData);
  })
  .post((req, res) => {
    const { original, thumbnail } = req.body;
    const imagesData = readImagesList();
    const newImage = createNewImagesObject(original, thumbnail);
    imagesData.push(newImage);
    writeImagesList(imagesData);
    res.status(200).send("SUCCESS");
  });

// Helper Functions

function readImagesList() {
  const imagesFile = fs.readFileSync("./data/images.json");
  const imagesData = JSON.parse(imagesFile);
  return imagesData;
}

function writeImagesList(data) {
  fs.writeFileSync("./data/images.json", JSON.stringify(data));
  console.log(`${getTimestamp()}: New Data written to ./data/images.json`);
}

function createNewImagesObject(original, thumbnail) {
  const newImage = {
    id: uuid.v4(),
    original,
    thumbnail,
    timestamp: new Date(),
  };
  return newImage;
}

function getTimestamp() {
  const unixTimeNow = new Date();
  const timestamp = unixTimeNow.toLocaleTimeString("it-IT");

  return timestamp;
}

module.exports = router;
