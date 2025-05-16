import { Router } from "express";
import authRouter from "./auth.route";
import vehicleRouter from "./vehicle.route";
import slotRouter from "./slot.route";
import parkingSessionRouter from "./parkingSession.route";

const router = Router();

router.use("/auth", authRouter
    /*
        #swagger.tags = ['Auth']
    */
);

router.use("/vehicle", vehicleRouter
    /*
        #swagger.tags = ['Vehicle']
        #swagger.security = [{
                "bearerAuth": []
        }] 
    */
)

router.use("/slot", slotRouter
    /*
        #swagger.tags = ['Parking Slot']
        #swagger.security = [{
                "bearerAuth": []
        }] 
    */
)

router.use("/parkingSession", parkingSessionRouter
    /*
        #swagger.tags = ['Parking Session']
        #swagger.security = [{
                "bearerAuth": []
        }] 
    */
)

export default router;