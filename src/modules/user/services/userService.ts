import User from "../models/User";
import ListFilterData from "../../../interfaces/ListFilterData";
import { createPasswordHash } from "../../authentication/utils/createPasswordHash";

export default class UserService{
    list=async ({limit,skip,filterQuery,sort}:ListFilterData)=>{
        limit=limit?limit:10;
        skip=skip?skip:0;
        const users=await User.find(filterQuery)
            .sort(sort)
            .limit(limit)
            .skip(skip);

           const total=await User.countDocuments(filterQuery)
           return{
            total,
            limit,
            skip,
            items:users
           } 
    };
    create=async(data:any)=>{
        const password=await createPasswordHash(data.password);
        delete data.password;
        return await User.create({...data,...{password}});
    };
    findOne=async(id:string)=>{
        return await User.findOne({_id:id})
    };
    update=async(id:string,user:any)=>{
        return await User.findByIdAndUpdate(id,user)
    };
}