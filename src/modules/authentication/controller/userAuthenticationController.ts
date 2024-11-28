import { generateTokens } from './../utils/generateJwtTokwn';
import { body } from 'express-validator';
import {Request, Response, NextFunction } from "express";
import BaseController from "../../base/controller/BaseController";
import UserAuthenticatonService from "../service/userAuthenticationService";
import AuthenticationFailedError from "../../../errors/errorList/AuthenticationFailedError";
import BadRequestErrror from "../../../errors/errorList/BadRequestErro";
import verifyRefreshToken from "../utils/verifyRefreshToken";
import User from "../../user/models/User";
import CustomError from "../../../errors/errorList/customError";
import serverError from "../../../errors/errorList/serverError";
import axios from 'axios';

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
   

    // googleAuth = (req:any, res:any,next:any) => {
    //     try {
    
    //         if (req.body.access_token) {
    //             console.log("Access Token:", req.body.access_token);

    //             //fetching user details form google
    //             axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${req.body.access_token}`).then(async (response) => {
    //                 //checking user exist or not
    //                 const user = await User.findOne({ email: response.data.email }, { password: 0 })
    
    //                     if (user) {
    //                         //checking user is login with google or not
    //                         if (user.loginWithGoogle) {
    //                             //checking status
    //                             if (user.status) {
    //                                 //login success
    //                                 const token = await this.service.jwtCreate(user.id);
    //                                 res.status(200).json({ created: true, user, token, message: "Login Success" })
    //                             } else {
    //                                 //if status false account suspended
    //                                 res.json({ status: "Blocked", message: "Account suspended" });
    //                             }
    //                         }else{
    //                             res.status(404).json({ created: false, message: "Email already exists" });
    //                         }
                            
    //                     } else {
    //                         //if user not exist creating new account
    //                         const newUser = await User.create({
    //                             googleId:response.data.id,
    //                             name:response.data.name,
    //                             email:response.data.email,
    //                             loginWithGoogle:true
    //                         });
    //                         //creating jwt token 
    //                         const token = await this.service.jwtCreate(newUser.id);
    //                         res.status(200).json({ created: true, user: newUser, token, message: "Signup Success" })
    //                     }
    
                   
    //             })
    //         } else {
    //             res.status(401).json({ message: "Not authorized" });
    //         }
    //     } catch (error) {
    //         next(error);
    //     }
    // }


     googleAuth = async (req:any, res:any) => {
        try {
          const user = req.user;
          if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
          }
      
          // Generate JWT tokens
          const { accesToken, refreshTOken } = await generateTokens(user.id);
          return res.status(200).json({ accesToken, refreshTOken, user });
        } catch (err:any) {
          res.status(500).json({ message: "Internal Server Error", error: err.message });
        }
      };
      
}
