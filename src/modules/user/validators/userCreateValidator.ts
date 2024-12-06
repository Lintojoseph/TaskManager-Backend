import { error } from 'console';
import { rejects } from 'assert';
import customValidator from "../../base/customValidator/customValidator";
import { body } from "express-validator";
import User from "../models/User";
import validatePassword from '../../authentication/utils/validatePassword';

export const userCreateValidator=[
    body("name")
     .custom(customValidator.isNotEmptyAndString)
     .bail()
     .isLength({max:100}),
    body("mobileNo")
     .custom(customValidator.isNotEmptyAndString)
     .bail()
     .isLength({max:20})
     .custom(async (number:string)=>{
        try{
            const trimmedNo=number.trim();
            const user=await User.findOne({mobileNo:trimmedNo});
            if(user){
                return Promise.reject("user with this mobileNo already exist")
            }
            return Promise.resolve();
        }catch(error:any){
            return Promise.reject(error.message)
        }
     }),
     body("email").optional().isEmail().isLength({max:100}), 
     body("password")
        .custom(customValidator.isNotEmptyAndString)
        .bail()
        .custom((password:any)=>{
            try{
                validatePassword.validate(password);
                return Promise.resolve();
            }catch(error:any){
                return Promise.reject(error.message)
            }
        }),
    body("isActive").isBoolean(),    
]