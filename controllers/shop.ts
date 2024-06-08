import fs from "fs";
import { RequestHandler } from "express";
import { cartProdsData } from "../../src/util/interfaces";
export const getShopData: RequestHandler = (req, res) => {
  fs.readFile("./data/shopData.json", (err, fileContent) => {
    if (err) console.log(err);
    setTimeout(() => {
      res.status(200).send(JSON.parse(fileContent.toString()));
    }, 100);
  });
  return "SHOP DATA SENT";
};

export const getCartData: RequestHandler = (req, res) => {
  fs.readFile("./data/cart.json", (err, fileContent) => {
    if (err) console.log(err);
    res.status(200).send(JSON.parse(fileContent.toString()));
  });
  return "CART DATA SENT";
};

export const postAddToCart: RequestHandler = (req, res) => {
  fs.readFile("./data/cart.json", (err, fileContent) => {
    if (err) console.log(err);
    const prodItm = req.body;
    const cart: { totalProducts: number; products: cartProdsData[] } =
      JSON.parse(fileContent.toString());
    let existingProductIdx = -1;
    for (let i = 0; i < cart.products.length; i++) {
      if (cart.products[i].name == prodItm.name) {
        existingProductIdx = i;
        break;
      }
    }
    const existingProduct = cart.products[existingProductIdx];
    let updatedProd: cartProdsData;
    if (existingProductIdx !== -1) {
      updatedProd = { ...existingProduct };
      updatedProd.quantity = updatedProd.quantity + 1;
      cart.products[existingProductIdx] = updatedProd;
    } else {
      cart.products.push(prodItm);
    }
    cart.totalProducts = 0;
    for (let i = 0; i < cart.products.length; i++) {
      cart.totalProducts += cart.products[i].quantity;
    }
    fs.writeFile("./data/cart.json", JSON.stringify(cart), (err) =>
      err ? err : "no error"
    );
  });
  res.redirect("/main/shop");
};

export const postIncreaseQTY: RequestHandler = (req, res) => {
  const name = req.body.name;
  fs.readFile("./data/cart.json", (err, fileContent) => {
    if (err) console.log(err);
    const cart: { totalProducts: number; products: cartProdsData[] } =
      JSON.parse(String(fileContent));
    for (let i = 0; i < cart.products.length; i++) {
      if (cart.products[i].name == name) {
        cart.products[i].quantity++;
        break;
      }
    }
    cart.totalProducts++;
    fs.writeFile("./data/cart.json", JSON.stringify(cart), (err) =>
      err ? err : "no error"
    );
  });
  res.redirect("/main/shop/cart");
};

export const postDecreaseQTY:RequestHandler = (req, res) => {
 const name = req.body.name;
 fs.readFile("./data/cart.json", (err, fileContent) => {
   if (err) console.log(err);
   const cart: { totalProducts: number; products: cartProdsData[] } =
     JSON.parse(String(fileContent));
   for (let i = 0; i < cart.products.length; i++) {
     if (cart.products[i].name == name) {
       if (cart.products[i].quantity == 1) {
         cart.products = cart.products.filter(
           (product) => product.name !== name
         );
       } else {
         cart.products[i].quantity--;
       }
       break;
     }
   }
   cart.totalProducts--;
   fs.writeFile("./data/cart.json", JSON.stringify(cart), (err) =>
     err ? err : "no error"
   );
 });
 res.redirect("/main/shop/cart");
}