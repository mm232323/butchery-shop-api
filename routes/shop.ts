import express from "express";
import * as ShopController from "../controllers/shop";
const router = express.Router();

router.get("/main/shop", ShopController.getShopData);

router.get("/main/shop/cart", ShopController.getCartData);

router.post("/main/shop/add-to-cart", ShopController.postAddToCart);

router.post("/main/shop/cart/increase-qty", ShopController.postIncreaseQTY);

router.post("/main/shop/cart/decrease-qty", ShopController.postDecreaseQTY);

export default router;
