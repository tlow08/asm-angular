import { Router } from "express";
import { CheckAuth } from "../middlewares/checkAuth.js";
import { getBidsForProduct, placeBid } from "../controllers/bidsController.js";

const bidRoutes = Router();

bidRoutes.post('/place-bid', CheckAuth, placeBid);
bidRoutes.get('/product/bid-list/:productId',CheckAuth, getBidsForProduct);

export default bidRoutes;