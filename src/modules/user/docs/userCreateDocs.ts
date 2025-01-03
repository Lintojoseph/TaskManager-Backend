import { Request, Response,NextFunction } from "express";


export const userCreateDoc=async(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
/**
  #swagger.tags = ['User']
  #swagger.consumes = ['application/x-www-form-urlencoded']
  #swagger.parameters["name"] = {
    "in": "formData",
    "description": "Full name of the user",
    "required": true,
    "type": "string",
   
  }
  #swagger.parameters["mobileNo"] = {
    "in": "formData",
    "description": "Mobile number of the user",
    "required": true,
    "type": "string",
    
  }
  #swagger.parameters["gender"] = {
            "in": "formData",
            "required": true,
            "type": "string"
  }
  #swagger.parameters["email"] = {
    "in": "formData",
    "description": "Email address of the user",
    "required": true,
    "type": "string",
   
  }
  #swagger.parameters["password"] = {
    "in": "formData",
    "description": "Password for the user account",
    "required": true,
    "type": "string",
    
  }
  #swagger.parameters["isActive"] = {
    "in": "formData",
    "description": "Whether the user is active",
    "required": true,
    "type": "boolean",
    
  }
  #swagger.security = [
    {
      JWT: []
    }
  ]
 */


     next();
}