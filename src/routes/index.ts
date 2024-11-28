import { Router } from "express"
import AuthenticationRouter from "../modules/authentication/routes/AuthenticationRouter"
import { GoogleAuthentication } from "../passport/googleAuthentication"
const express= require('express')
import route from "./indexRouter"
import GoogleAuthenticationRouter from '../modules/authentication/routes/GoogleAuthenticationRouter'

const router=express.Router()

router.use("/",route)
router.use("/auth/",AuthenticationRouter)
router.use("/auth/",GoogleAuthenticationRouter)

export default router