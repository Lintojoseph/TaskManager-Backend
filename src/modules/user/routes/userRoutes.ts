import express, { Request, Response, NextFunction } from "express";
import UserController from "../controllers/userController";
import { authenticateUser } from "../../authentication/middlewares/authenticateUser";
import setFilterParams from "../../../middlewares/setFilterparams";
import { userFilterFields } from "../models/User";
import authorizer from "../../../middlewares/authorizeUser";
import { userListDoc } from "../docs/userListDocs";
import { userCreateValidator } from "../validators/userCreateValidator";
import { userCreateDoc } from "../docs/userCreateDocs";

const router=express.Router();
const controller=new UserController();

router.use(authenticateUser);

router.get("/",
    setFilterParams(userFilterFields),
    userListDoc,
    controller.getList
)
router.post(
    "/",
    userCreateValidator,
    userCreateDoc,
    controller.create
)


export default router


