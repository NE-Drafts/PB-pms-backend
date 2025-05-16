import { Router } from "express";
import { checkAdmin, checkLoggedIn } from "../middlewares/auth.middleware";
import slotController from "../controllers/slot.controller";
import { validationMiddleware } from "../middlewares/validator.middleware";
import { CreateSlotDto } from "../dtos/slot.dto";

const slotRouter = Router()

slotRouter.post("/register", [checkLoggedIn, checkAdmin, validationMiddleware(CreateSlotDto)], slotController.registerSlot)
slotRouter.get("/all", [checkLoggedIn, checkAdmin], slotController.getAllSlots)
slotRouter.patch("/update/:slotId", [checkLoggedIn, checkAdmin, validationMiddleware(CreateSlotDto)], slotController.updateSlot)
slotRouter.delete("/delete/:slotNumber", [checkLoggedIn, checkAdmin], slotController.deleteSlot)
slotRouter.get("/getSlot/:slotNumber", [checkLoggedIn, checkAdmin], slotController.getSlot)

export default slotRouter;