import { NextFunction } from "express";


export const updateDiscriptionDOc=async(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    /*
        #swagger.tags=['discription']
        #swagger.consumes=['multipart/form-data']
        #swagger.parameters["title"]={
        "in":"formData",
        "required":true,
        "type":"string",
        }
        #swagger.parameter["discription"]={
        "in":"fromData",
        "required":false,
        "type":"string",

        }
        #swagger.parameters["date"]={
        "in":"formData",
        "required":true,
        "type":"string",
        }

        #swagger.security=[
        {
            JWT:[]
        }]

    */
   next()
}