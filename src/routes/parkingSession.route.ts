import { Router } from "express";
import { checkAdmin, checkLoggedIn } from "../middlewares/auth.middleware";
import { validationMiddleware } from "../middlewares/validator.middleware";
import { CreateParkingSession } from "../dtos/parkingSession.dto";
import parkingSessionController from "../controllers/parkingSession.controller";

const parkingSessionRouter = Router()

parkingSessionRouter.post("/create", [checkLoggedIn, checkAdmin, validationMiddleware(CreateParkingSession)], parkingSessionController.createParkingSession)
parkingSessionRouter.get("/all", [checkLoggedIn, checkAdmin], parkingSessionController.getAll)
parkingSessionRouter.get("/allByVehicle/:plateNumber", [checkLoggedIn], parkingSessionController.getVehicleParkingSessions)
parkingSessionRouter.get("/getParkingSession/:id", [checkLoggedIn], parkingSessionController.getParkingSession)
parkingSessionRouter.put("/exitParkingSession/:plateNumber", [checkLoggedIn, checkAdmin], parkingSessionController.exitParkingSession)

export default parkingSessionRouter;