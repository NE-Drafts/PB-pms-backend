import { Router } from "express";
import { checkAdmin, checkLoggedIn } from "../middlewares/auth.middleware";
import usersController from "../controllers/user.controller";
import { validationMiddleware } from "../middlewares/validator.middleware";
import { UpdateUserDto } from "../dtos/user.dto";

const userRouter = Router()

userRouter.get("/all", [checkLoggedIn, checkAdmin], usersController.getAllUsers)
userRouter.get("/getById/:id" [checkLoggedIn], usersController.getUser)
userRouter.patch("/update/:id", [checkLoggedIn, validationMiddleware(UpdateUserDto)], usersController.updateUser)
userRouter.delete("/delete/:id", [checkLoggedIn, checkAdmin], usersController.deleteUser)

export default userRouter;