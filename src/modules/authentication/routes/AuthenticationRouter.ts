import { jwtCreateDoc } from './../docs/jwtCreateDocs';
import express from 'express'
import UserAuthenticationController from '../controller/userAuthenticationController'
import { loginMiddleware } from '../middlewares/loginMiddleware'
import { VerifyRefreshTOkenValidation } from '../validator/verifyRefreshTokenValidationChain';
import { jwtVerifyDoc } from '../docs/jwtVerifyDoc';


const router=express.Router()
const controller=new UserAuthenticationController()

router.post("/jwt/create", loginMiddleware,jwtCreateDoc,controller.login)


router.post("/jwt/verify",VerifyRefreshTOkenValidation,jwtVerifyDoc,controller.verifyRefreshToken)




export default router;


