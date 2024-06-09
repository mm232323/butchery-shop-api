"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMessage = exports.getMainData = exports.getStart = exports.setHeaders = void 0;
const fs_1 = __importDefault(require("fs"));
const setHeaders = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Content-Security-Policy", "upgrade-insecure-requests");
    next();
};
exports.setHeaders = setHeaders;
const getStart = (req, res, next) => {
    res.status(200).send({ "message": 'buchery shop starting page' });
};
exports.getStart = getStart;
const getMainData = (req, res) => {
    fs_1.default.readFile("./data/mainPageData.json", (err, fileData) => {
        res.status(200).send(JSON.parse(fileData.toString()));
    });
    return "MAIN DATA SENT!";
};
exports.getMainData = getMainData;
const postMessage = (req, res) => {
    const userData = req.body;
    fs_1.default.readFile("./data/messages.json", (err, fileData) => {
        let messages = [];
        if (err) {
            console.log(err);
            return;
        }
        messages = JSON.parse(fileData.toString());
        messages.push(userData);
        fs_1.default.writeFile("./data/messages.json", JSON.stringify(messages), (err) => console.log(err));
    });
    console.log("MAIN DATA POSTED");
    res.redirect("/main");
};
exports.postMessage = postMessage;
