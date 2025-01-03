import express from "express";
import { DiscriptionController } from "../controller/discriptionController";
import { authenticateUser } from "../../authentication/middlewares/authenticateUser";
import { discribtionListDoc } from "../docs/listDiscribtionDoc";

import setFilterParams from "../../../middlewares/setFilterparams";
import { discribtionFields } from "../models/discribe";
import { authorizer } from "../../../middlewares/authorizeUser";
import { createDiscriptionDocs } from "../docs/createDiscriptionDocs";
import { createDiscribtionValidator } from "../validators/createDiscribtion";



const router=express.Router()
const controller=new DiscriptionController()

router.use(authenticateUser)

router.get("/",
    discribtionListDoc,
    authorizer(),
    setFilterParams(discribtionFields),
    controller.get
)

router.post("/",
    createDiscriptionDocs,
    authorizer(),
    createDiscribtionValidator,
    controller.create

);


export default router
