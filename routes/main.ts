import express from "express";

import * as MainController from '../controllers/main'

const router = express.Router();

router.use(MainController.setHeaders);

router.get("/main",MainController.getMainData);

router.post("/main/send-message",MainController.postMessage);

export default router;
