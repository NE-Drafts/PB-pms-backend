import { Router } from "express";
import authRouter from "./auth.route";

const router = Router();

router.use("/auth", authRouter
    /*
        #swagger.tags = ['Auth']
        #swagger.security = [{
                "bearerAuth": []
        }] 
    */
);

export default router;