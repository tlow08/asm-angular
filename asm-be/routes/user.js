import { Router } from "express";
import AuthController from "../controllers/AuthController.js";

const authRoute = Router();
const authController = new AuthController();

authRoute.post("/register", authController.registerUser);
authRoute.post("/login", authController.loginUser);

export default authRoute;