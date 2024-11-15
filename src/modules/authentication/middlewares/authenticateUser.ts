import {Request, Response, NextFunction } from "express";
import { Session } from "inspector/promises";
import AuthenticationFailedError from "../../../errors/errorList/AuthenticationFailedError";
const passport=require("passport")


export const authenticateUser=(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    passport.authenticate("jwt",{Session:false},(error:any,user:any)=>{
        if(error){
            next(new AuthenticationFailedError({error}))
        }
        if(!user){
            next(
                new AuthenticationFailedError({
                    error:"invalid authentication token"
                })
            )
        }
        req.user=user;
        next();
    }
)(req,res,next)
}