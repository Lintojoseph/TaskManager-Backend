import express from "express";
import AccountDetailsController from "../controllers/accountDetailController";
import { authenticateUser } from "../../authentication/middlewares/authenticateUser";
import { userDetailsDocs } from "../docs/accountDetailDocs";

const router=express.Router()
const controller= new AccountDetailsController()

router.use(authenticateUser)

router.get("/details",userDetailsDocs,controller.details)