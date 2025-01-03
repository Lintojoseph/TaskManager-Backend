import mongoose from "mongoose";
import ModelfilterInterface from "../../../interfaces/ModelFilterInterfaces";
import { DescribtionStatus } from "../../base/enums/describtionStatus";


const discribtionSchema=new mongoose.Schema(
    {
        title:{type:String,required:true},
        discription:{type:String,required:false},
        time:{type:Date,default:Date.now},
        status:{type:Boolean,enum:Object.values(DescribtionStatus)},
        createdby:{type:mongoose.Schema.Types.ObjectId,ref:"User"}


    }
);

export const discribtionFields:ModelfilterInterface={
    filterFields:[
        "title",
        "createdby",
    ],
    searchFields:["title"],
    sortFields:["title","updatedAt","createdAt"]
}

export const Discribtion=mongoose.model("Discription",discribtionSchema)