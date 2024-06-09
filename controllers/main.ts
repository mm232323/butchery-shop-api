import { RequestHandler } from "express";
import { messageData } from '../../client/src/util/interfaces'
import fs from "fs";

export const setHeaders: RequestHandler = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Security-Policy", "upgrade-insecure-requests");
  next();
};

export const getStart: RequestHandler = (req,res,next) => {
  res.status(200).send({"message":'buchery shop starting page'})
}

export const getMainData: RequestHandler = (req, res) => {
  fs.readFile("./data/mainPageData.json", (err, fileData) => {
    res.status(200).send(JSON.parse(fileData.toString()));
  });
  return "MAIN DATA SENT!";
};

export const postMessage: RequestHandler = (req, res) => {
  const userData = req.body;
  fs.readFile("./data/messages.json", (err, fileData) => {
    let messages: messageData[] = [];
    if (err) {
      console.log(err);
      return;
    }
    messages = JSON.parse(fileData.toString());
    messages.push(userData);
    fs.writeFile("./data/messages.json", JSON.stringify(messages), (err) =>
      console.log(err)
    );
  });
  console.log("MAIN DATA POSTED");
  res.redirect("/main");
};
