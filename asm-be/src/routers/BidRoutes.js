import { Router } from "express";
import { createBid, updateBid } from "../controllers/bidsController.js";

const bidRoutes = Router();

bidRoutes.post("/", createBid);
bidRoutes.put("/:id", updateBid);

export default bidRoutes;