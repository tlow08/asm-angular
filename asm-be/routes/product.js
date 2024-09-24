import { Router } from "express";
import ProductController from "../controllers/ProductController.js";

const productRouter = Router();

const productController = new ProductController();

productRouter.get("/", productController.getList);
productRouter.get("/:id", productController.getDetail);

export default productRouter;