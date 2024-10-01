import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  removeProductById,
  updateProductById,
} from "./../controllers/productController.js";
import { CheckAuth } from "../middlewares/checkAuth.js";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);

productRouter.post("/",  createProduct);
productRouter.patch("/:id", updateProductById);
productRouter.delete("/:id",CheckAuth, removeProductById);
export default productRouter;
