import { Request, Response,NextFunction } from "express";


export const userDetailsDocs=async(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    /*
        #swagger.tags=['Account']
        #swagger.responses[200]={
            description:'Endpoint to the details of a user using his jwt token',
            schema:{
                success:true,
                data:{
                    _id:"65cd9d8d5cae5ffc348ed638",
                    name:"string",
                    mobileNo:"string",
                    gender:"string",
                    isActive:true,
                    isSuperAdmin:false,
                    createdAt:"2024-02-15T05:53:06.960Z",
                    updatedAt:"2024-02-15T05:53:06.960Z"

            
                }
            }
        }
            #swagger.security = [
      {
        JWT: []
      }
    ] 

    */
   next();
}