import {Request, Response, NextFunction } from "express"
import PermissionDeniedError from "../errors/errorList/permissionDenied";

export const authorizer=()=>{
    return(req:Request,res:Response,next:NextFunction)=>{
        try{
            const user=req.user;
            if(user.isSuperAdmin){
                next();
                return;
            }
            next(
                new PermissionDeniedError({
                    error:"you are not allowed to perform this action"
                })
            )
           
        }
        catch(e:any){
            next(e)
        }
    }
}

