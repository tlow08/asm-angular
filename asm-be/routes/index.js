import {Router} from "express";
import productRouter from "./product.js";
import authRoute from "./user.js";

const router = Router();

router.use("/products", productRouter);
router.use("/auth", authRoute);

export default router;
