import { Router } from "express";
import authController from "../controllers/auth.controller";
import { validationMiddleware } from "../middlewares/validator.middleware";
import { LoginDTO, RegisterDTO } from "../dtos/auth.dto";

const authRouter = Router();

authRouter.post("/register", [validationMiddleware(RegisterDTO)], authController.register);
authRouter.post("/login", [validationMiddleware(LoginDTO)], authController.login)

export default authRouter;
