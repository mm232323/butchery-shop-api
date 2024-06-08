"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
router.get("/main/barbecue", (req, res) => {
    setTimeout(() => {
        fs_1.default.readFile("./data/meals.json", (err, fileContent) => {
            res.status(200).send(JSON.parse(fileContent.toString()));
        });
    }, 1000);
    return "MEALS DATA SENT!";
});
exports.default = router;
