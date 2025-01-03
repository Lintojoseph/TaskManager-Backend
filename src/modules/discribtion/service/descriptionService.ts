import ListFilterData from "../../../interfaces/ListFilterData"
import { Discribtion } from "../models/discribe"

export default class DescriptionService{

    create=async(discription:any)=>{
        return await discription.create(discription)
    }

    find=async({limit,skip,filterQuery,sort}:ListFilterData)=>{
        limit=limit?limit:10;
        skip=skip?skip:0;

        const describtions=await Discribtion.find(filterQuery)
        .populate("createdby")
        .sort(sort)
        .limit(limit)
        .skip(skip)

        const total=await Discribtion.countDocuments(filterQuery);
        return{
            total,
            limit,
            skip,
            items:describtions
        }
    }

    findById=async(id:string)=>{
        const discribtions=await Discribtion.find({createdby:id})
        .populate("createdby")
        .sort({createdAt:"asc"})
        return discribtions;
    }
    findOne=async(id:String)=>{
        return await Discribtion.findById(id).populate("user")
    }

    update=async(id:String,body:any)=>{
        return await Discribtion.findByIdAndDelete(id,body)
    }

    delete=async(id:any)=>{
        return await Discribtion.findByIdAndDelete(id)
    }

}