import { Router } from "express";
import { checkAdmin, checkLoggedIn } from "../middlewares/auth.middleware";
import paymentController from "../controllers/payment.controller";

const paymentRouter = Router()

paymentRouter.get("/all", [checkLoggedIn, checkAdmin], paymentController.getAllPayments)
paymentRouter.get("/getPayment/:id", [checkLoggedIn], paymentController.getPayment)
paymentRouter.get("/vehiclePayments/:plateNumber", [checkLoggedIn], paymentController.getVehiclePayments)

export default paymentRouter;