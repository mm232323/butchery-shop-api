"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const main_1 = __importDefault(require("./routes/main"));
const barbecue_1 = __importDefault(require("./routes/barbecue"));
const locations_1 = __importDefault(require("./routes/locations"));
const shop_1 = __importDefault(require("./routes/shop"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(main_1.default);
app.use(barbecue_1.default);
app.use(locations_1.default);
app.use(shop_1.default);
app.listen(3000);
