import { Request, Response, NextFunction } from "express";

export const googleCreateDoc = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /*  
        #swagger.tags = ['Authentication']
        #swagger.parameters['parameter_name'] = {
                in: 'body',
                description: 'Endpoint to create google authentication',
                schema: {
                    access_token:"string"
                }
        } 
    */
  next();
};
