import { Request, Response, NextFunction } from "express";

export const userUpdateDoc = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /*  
          #swagger.tags = ['User']
          #swagger.consumes = ['multipart/form-data']
          #swagger.parameters["name"] = {
            "in": "formData",
            "required": false,
            "type": "string"
          }
          #swagger.parameters["email"] = {
            "in": "formData",
            "required": false,
            "type": "string"
          }
          
          #swagger.parameters["isActive"] = {
            "in": "formData",
            "required": false,
            "type": "string",
            "enum": [ "true", "false"]
          }
          
          #swagger.security = [
            {
              JWT: []
            }
          ] 
      */
  next();
};
