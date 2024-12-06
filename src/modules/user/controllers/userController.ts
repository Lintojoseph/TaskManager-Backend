import {Request, Response, NextFunction } from "express";
import BaseController from "../../base/controller/BaseController";
import UserService from '../services/userService';
import { validationResult } from "express-validator";
import ValidationFailedError from "../../../errors/errorList/ValidationFailedError";
import mongoose from "mongoose";
import BadRequestErrror from "../../../errors/errorList/BadRequestErro";
import NotFoundError from "../../../errors/errorList/NotFoundError";

export default class UserController extends BaseController {
    service=new UserService();

    getList=async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const {limit,skip,search}=req.query;
            const {filterQuery,sort}=req;
            const data=await this.service.list({
                limit:Number(limit),
                skip:Number(skip),
                filterQuery,
                sort,
            })
            this.sendSucessResponseList(res,200,{data})
        }catch(e){
            next(e);
        }
    };

    create=async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log("Before validation:", req.body); 
            const errors=validationResult(req);
            if(!errors.isEmpty()){
                next(new ValidationFailedError({errors:errors.array()}))
                return;
            }
            const { name, email, password, mobileNo, isActive, } = req.body
            const user = await this.service.create({ name, email, password, mobileNo, isActive,});
            console.log(user,'created user')
            this.sendSuccessResponse(res,201,{ data :user})
        }
        catch(error:any){
            if(error instanceof mongoose.Error.CastError){
                next(new BadRequestErrror({error:"invalid data"}));
            }
            next(error)
        }
    };

    getOne=async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const user=await this.service.findOne(req.params.id);
            if(!user){
                throw new NotFoundError({error:"user not found"})
            }
            this.sendSuccessResponse(res,200,{data:user})
        }catch(e:any){
            if(e instanceof mongoose.Error.CastError){
                next(new BadRequestErrror({error:"invalid user_id"}))
            }
            next(e);
        }
    };

    update=async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const errors=validationResult(req);
            if(!errors.isEmpty()){
                next(new ValidationFailedError({errors:errors.array()}));
                return;
            }
            const {
                name,
                email,
                isActive,
            }=req.body;
            const body:any={
                name,
                email,
                isActive,
            }
            const user=await this.service.update(req.params.id,body)
            if(!user){
                throw new NotFoundError({error:"user not found"})
            }
            this.sendSuccessResponse(res,200,{data:{data:{_id:user!._id}}})
        }
        catch(e:any){
            if(e instanceof mongoose.Error.CastError){
                next(new BadRequestErrror({error:"invalid user_id"}))
            }
            next(e);

        }
    }

}