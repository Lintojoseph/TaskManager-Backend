import express from "express";
const passport=require('passport')
const cors = require("cors");
import UserAuthenticationController from '../controller/userAuthenticationController'
import { googleCreateDoc } from "../docs/googleCreateDoc";
const router=express.Router();
const controller=new UserAuthenticationController()
// router.post(
//     "/google",googleCreateDoc, controller.googleAuth)

router.get(
        "/google", cors(),
        passport.authenticate("google", { scope: ["profile", "email"],session:false })
    );
    
router.get("/google/callback",passport.authenticate("google",{failureRedirect:"/login", session: false}),controller.googleAuth


 )

export default router