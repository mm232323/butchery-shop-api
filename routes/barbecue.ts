import express from "express";

import fs from "fs";

const router = express.Router();

router.get("/main/barbecue", (req, res) => {
  setTimeout(() => {
    fs.readFile("./data/meals.json", (err, fileContent) => {
      res.status(200).send(JSON.parse(fileContent.toString()));
    });
  }, 1000);
  return "MEALS DATA SENT!";
});
export default router;
