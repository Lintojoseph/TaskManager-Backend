import {Request, Response, NextFunction } from "express";
import AuthenticationFailedError from "../../../errors/errorList/AuthenticationFailedError";
const passport = require("passport");


export const loginMiddleware=(
    req:Request,
    res:Response,
    next:NextFunction

)=>{
    passport.authenticate("local",(error:any,user:any)=>{
        if(error){
            return next(new AuthenticationFailedError({error}))
        }
        if(!user){
           return next(
                new AuthenticationFailedError({
                    error:"username or password is invalid",
                })
            )
        }
        req.user=user;
        console.log(req.user,'ussrrr')
        return next()
    })(req,res,next)
}