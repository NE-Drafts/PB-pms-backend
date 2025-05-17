import { Router } from "express";
import authRouter from "./auth.route";
import vehicleRouter from "./vehicle.route";
import slotRouter from "./slot.route";
import parkingSessionRouter from "./parkingSession.route";
import paymentRouter from "./payment.route";
import userRouter from "./user.route";

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

router.use("/payment", paymentRouter
    /*
        #swagger.tags = ['Payment']
        #swagger.security = [{
            "bearerAuth": []
        }] 
    */
)

router.use("/user", userRouter
    /*
        #swagger.tags = ['Users']
        #swagger.security = [{
            "bearerAuth": []
        }] 
    */
)


export default router;