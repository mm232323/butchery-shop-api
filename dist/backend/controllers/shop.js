"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDecreaseQTY = exports.postIncreaseQTY = exports.postAddToCart = exports.getCartData = exports.getShopData = void 0;
const fs_1 = __importDefault(require("fs"));
const getShopData = (req, res) => {
    fs_1.default.readFile("./data/shopData.json", (err, fileContent) => {
        if (err)
            console.log(err);
        setTimeout(() => {
            res.status(200).send(JSON.parse(fileContent.toString()));
        }, 100);
    });
    return "SHOP DATA SENT";
};
exports.getShopData = getShopData;
const getCartData = (req, res) => {
    fs_1.default.readFile("./data/cart.json", (err, fileContent) => {
        if (err)
            console.log(err);
        res.status(200).send(JSON.parse(fileContent.toString()));
    });
    return "CART DATA SENT";
};
exports.getCartData = getCartData;
const postAddToCart = (req, res) => {
    fs_1.default.readFile("./data/cart.json", (err, fileContent) => {
        if (err)
            console.log(err);
        const prodItm = req.body;
        const cart = JSON.parse(fileContent.toString());
        let existingProductIdx = -1;
        for (let i = 0; i < cart.products.length; i++) {
            if (cart.products[i].name == prodItm.name) {
                existingProductIdx = i;
                break;
            }
        }
        const existingProduct = cart.products[existingProductIdx];
        let updatedProd;
        if (existingProductIdx !== -1) {
            updatedProd = Object.assign({}, existingProduct);
            updatedProd.quantity = updatedProd.quantity + 1;
            cart.products[existingProductIdx] = updatedProd;
        }
        else {
            cart.products.push(prodItm);
        }
        cart.totalProducts = 0;
        for (let i = 0; i < cart.products.length; i++) {
            cart.totalProducts += cart.products[i].quantity;
        }
        fs_1.default.writeFile("./data/cart.json", JSON.stringify(cart), (err) => err ? err : "no error");
    });
    res.redirect("/main/shop");
};
exports.postAddToCart = postAddToCart;
const postIncreaseQTY = (req, res) => {
    const name = req.body.name;
    fs_1.default.readFile("./data/cart.json", (err, fileContent) => {
        if (err)
            console.log(err);
        const cart = JSON.parse(String(fileContent));
        for (let i = 0; i < cart.products.length; i++) {
            if (cart.products[i].name == name) {
                cart.products[i].quantity++;
                break;
            }
        }
        cart.totalProducts++;
        fs_1.default.writeFile("./data/cart.json", JSON.stringify(cart), (err) => err ? err : "no error");
    });
    res.redirect("/main/shop/cart");
};
exports.postIncreaseQTY = postIncreaseQTY;
const postDecreaseQTY = (req, res) => {
    const name = req.body.name;
    fs_1.default.readFile("./data/cart.json", (err, fileContent) => {
        if (err)
            console.log(err);
        const cart = JSON.parse(String(fileContent));
        for (let i = 0; i < cart.products.length; i++) {
            if (cart.products[i].name == name) {
                if (cart.products[i].quantity == 1) {
                    cart.products = cart.products.filter((product) => product.name !== name);
                }
                else {
                    cart.products[i].quantity--;
                }
                break;
            }
        }
        cart.totalProducts--;
        fs_1.default.writeFile("./data/cart.json", JSON.stringify(cart), (err) => err ? err : "no error");
    });
    res.redirect("/main/shop/cart");
};
exports.postDecreaseQTY = postDecreaseQTY;
