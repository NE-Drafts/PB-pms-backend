import { Router } from "express";
import { validationMiddleware } from "../middlewares/validator.middleware";
import { CreateVehicleDto, UpdateVehicleDto } from "../dtos/vehicle.dto";
import vehicleController from "../controllers/vehicle.controller";
import { checkLoggedIn } from "../middlewares/auth.middleware";

const vehicleRouter = Router()

vehicleRouter.post("/register", [checkLoggedIn, validationMiddleware(CreateVehicleDto)], vehicleController.registerVehicle)
vehicleRouter.get("/getByPlate/:plateNumber", [checkLoggedIn], vehicleController.getVehicle)
vehicleRouter.get("/all", [checkLoggedIn], vehicleController.getAllVehicles)
vehicleRouter.get("/getByUser/:userId", [checkLoggedIn], vehicleController.getUserVehicles)
vehicleRouter.patch("/update/:id", [checkLoggedIn, validationMiddleware(UpdateVehicleDto)], vehicleController.updateVehicle)
vehicleRouter.delete("/delete/:id", [checkLoggedIn], vehicleController.deleteVehicle)

export default vehicleRouter;