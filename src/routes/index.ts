import { Router } from "express"
import AuthenticationRouter from "../modules/authentication/routes/AuthenticationRouter"

const express= require('express')
import route from "./indexRouter"

const router=express.Router()

router.use("/",route)
router.use("/auth/",AuthenticationRouter)

export default router