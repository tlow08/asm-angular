import { Router } from "express";
import ProductController from "../controllers/ProductController.js";

const productRouter = Router();

const productController = new ProductController();

productRouter.get("/", productController.getList);

export default productRouter;