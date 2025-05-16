import { Router } from "express";
import authRouter from "./auth.route";
import vehicleRouter from "./vehicle.route";

const router = Router();

router.use("/auth", authRouter
    /*
        #swagger.tags = ['Auth']
        #swagger.security = [{
                "bearerAuth": []
        }] 
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

export default router;