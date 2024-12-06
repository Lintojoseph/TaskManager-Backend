import { loginMiddleware } from './../modules/authentication/middlewares/loginMiddleware';
import { Request, Response, NextFunction } from "express";
import ModelfilterInterface from '../interfaces/ModelFilterInterfaces'
import BadRequestErrror from "../errors/errorList/BadRequestErro";
import { getFilterQuery } from '../utilities/filterQuery';
import FilterException from '../errors/errorList/filterException';
import { removeBasicParams } from '../utilities/removeBasicParams';
const setFilterParams=({
    filterFields,
    searchFields,
    sortFields,
}:ModelfilterInterface)=>{
  return (req:Request,res:Response,next:NextFunction)=>{
    try{
        let sortBy=req.query.sortBy as string;
        const search=req.query.search as string;
        let sortOption:string='desc';
        if(sortBy){
            if(sortBy[0]==="-"){
                sortOption="asc";
                sortBy=sortBy.slice(1);
            }
            if(!sortFields.includes(sortBy as string)){
                next(new BadRequestErrror({error: "sorting parameter not allowed "}));
                return;
            }
            req.sort={
                [sortBy]:sortOption,
            };
            delete req.query.sortBy;
        }

        // filter
        const {limit,skip}=req.query;
        const filter=getFilterQuery({
            queryParameters:removeBasicParams(req.query),
            filterFields,
            search,
            searchFields
        });

        req.filterQuery=filter;
        req.query.limit=limit;
        req.query.skip=skip;
        req.query.search=search
        next()
    }
    catch(e:any){
        if(e instanceof FilterException){
            next(new BadRequestErrror({error:e.message}))
        }
        next(e);

    }
  }
}

export default setFilterParams