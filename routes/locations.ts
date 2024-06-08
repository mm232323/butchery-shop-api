import express from "express";
import fs from "fs";

const router = express.Router();

router.get("/main/locations", (req, res) => {
  fs.readFile("./data/locations.json", (err, fileContent) => {
    if (err) console.log(err);
    res.status(200).send(JSON.parse(fileContent.toString()));
  });
  return 'LOCATION DATA SENT'
});

export default router