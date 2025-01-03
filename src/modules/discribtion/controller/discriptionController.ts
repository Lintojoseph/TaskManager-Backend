
import { Request, Response,NextFunction } from "express";
import BaseController from "../../base/controller/BaseController";
import DescriptionService from "../service/descriptionService";
import { validationResult } from "express-validator";
import ValidationFailedError from "../../../errors/errorList/ValidationFailedError";
import NotFoundError from '../../../errors/errorList/NotFoundError';
import mongoose from 'mongoose';
import BadRequestErrror from '../../../errors/errorList/BadRequestErro';


export class DiscriptionController extends BaseController{
    service=new DescriptionService()


    create=async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const errors=validationResult(req);
            if(!errors.isEmpty()){
                next(new ValidationFailedError({errors:errors.array()}))
                return
            }
            req.body.createdby=req.user._id;
            const discription=await this.service.create(req.body)
            this.sendSuccessResponse(res,201,{data:discription})
        }catch(e:any){
            next(e)
        }
    }

    get=async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const {limit,skip,search}=req.query;
            const { filterQuery,sort}=req;
            const data=await this.service.find({
                limit:Number(limit),
                skip:Number(skip),
                search:typeof search !="string" ? "":search,
                filterQuery,
                sort,

            })
            this.sendSucessResponseList(res,200,{ data })


        }
        catch(e:any){
            next(e)
        }
    }

    getOne=async(res:Response,req:Request,next:NextFunction)=>{
        try{
            const discription=await this.service.findOne(req.params.id)
            if(!discription){
                throw new NotFoundError({error:"discribtion is not found"})
            }
            this.sendSuccessResponse(res,200,{data:discription})

        }
        catch(e:any){
            next(e)
        }
    }

    update=async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const errors=validationResult(req);
            if(!errors.isEmpty()){
                next(new ValidationFailedError({errors:errors.array()}))
                return
            }
            const discription=await this.service.update(req.params.id,req.body)
            if(!discription){
                throw new NotFoundError({error:"dicribtion is not found"})
            }
            this.sendSuccessResponse(res,200,{data:{_id:discription!._id}})
        }catch(e:any){
            if(e instanceof mongoose.Error.CastError){
                next(new BadRequestErrror({error:"invalid discribtion id"}))
            }
            next(e)
        }
    }
    delete=async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const discribtion=await this.service.delete(req.params.id)
            if(!discribtion){
                throw new NotFoundError({error:"discribtion is not found"})
            }
            this.sendSuccessResponse(res,204,{data:{}})
        }catch(e:any){
            if(e instanceof mongoose.Error.CastError){
                next(new BadRequestErrror({error:"invalid discribtion"}))
            }
            next(e)
        }
    }
}