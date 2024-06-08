"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
router.get("/main/locations", (req, res) => {
    fs_1.default.readFile("./data/locations.json", (err, fileContent) => {
        if (err)
            console.log(err);
        res.status(200).send(JSON.parse(fileContent.toString()));
    });
    return 'LOCATION DATA SENT';
});
exports.default = router;
