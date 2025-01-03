import {Request, Response, NextFunction } from "express";
import BaseController from "../../base/controller/BaseController";
import UserService from "../../user/services/userService";
import NotFoundError from "../../../errors/errorList/NotFoundError";


export default class AccountDetailsController extends BaseController{
    userService=new UserService();

    details=async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const user=await this.userService.findOne(req.user._id)
            if(!user){
                throw new NotFoundError({error:"user not found"})
            }
            this.sendSuccessResponse(res,200,{data:user})
        }
        catch(e:any){
            next(e)
        }
    }
}