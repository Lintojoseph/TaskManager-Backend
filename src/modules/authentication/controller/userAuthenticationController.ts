import {Request, Response, NextFunction } from "express";
import BaseController from "../../base/controller/BaseController";
import UserAuthenticatonService from "../service/userAuthenticationService";
import AuthenticationFailedError from "../../../errors/errorList/AuthenticationFailedError";
import BadRequestErrror from "../../../errors/errorList/BadRequestErro";
import verifyRefreshToken from "../utils/verifyRefreshToken";
import User from "../../user/models/User";
import CustomError from "../../../errors/errorList/customError";
import serverError from "../../../errors/errorList/serverError";

export default class UserAuthenticationController extends BaseController{
    service=new UserAuthenticatonService()


    login=async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.user,'userrr')
            const user=req.user;
            
            if(!user){
                throw new AuthenticationFailedError({error:"user not found"})
            }
            const tokenData=await this.service.jwtCreate(user._id)
            this.sendSuccessResponse(res,200,{
                message:"user authenticated successfullly",
                data:{
                    ...{
                        id:user.id,
                        isSuperAdmin:user.isSuperAdmin
                    },
                    ...tokenData,
                },
            });
        }catch(e:any){
            next(new AuthenticationFailedError({error:e.message}))
        }
    };

    verifyRefreshToken=async(
        req:Request,
        res:Response,
        next:NextFunction
    )=>{
        try{
            const refreshToken=req.body.refreshToken;
            
            if(!refreshToken){
                throw new BadRequestErrror({error:"invalid refreshToken"})
            }
            let userId:any;
            try{
                const{id}:any=await verifyRefreshToken(refreshToken)
                userId=id;
            }catch(e:any){
                throw new AuthenticationFailedError({error:e.message})
            }
            const user=await User.findOne({_id:userId})
            if(!user){
                throw new AuthenticationFailedError({error:"user not found"})
            }
            const tokenData=await this.service.jwtCreate(userId)
            this.sendSuccessResponse(res,200,{
                message:"token refereshed successfully",
                data:{
                    ...{
                        id:user.id,
                        isSuperAdmin:user.isSuperAdmin,
                      
                    },
                    ...tokenData
                }, 
            })
        }catch(e:any){
            if(e instanceof CustomError){
                next(e);
                return;
            }
            next(new serverError({error:e.error || e.message}))
        }
    }
}


