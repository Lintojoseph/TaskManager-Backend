
import mongoose from "mongoose";
import ModelfilterInterface from "../../../interfaces/ModelFilterInterfaces";

const userSchema=new mongoose.Schema(
    {
    name:{type:String,required:true,unique:false,maxLength:100},
    mobileNo: { type: String,  default: null , unique: true, maxLength: 20 },
 
    password:{type:String, default: null,maxLength:150,select:false},
    email: { type: String,required:true, unique: true },
    googleId: { type: String, unique: true,sparse: true, default: null  },  
    isSuperAdmin: {
        type: Boolean,
        required: false,
        default: false,
      },
      loginWithGoogle: {
        type: Boolean,
        default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
      isActive: {
        type: Boolean,
        required: true,
        default: false,
      },
},
{ timestamps:true }
);

export const userFilterFields: ModelfilterInterface = {
  filterFields: [
    "name",
    "mobileNo",
    "email",
    "isActive",
    "isSuperAdmin",
  ],
  searchFields: ["name", "mobileNo", "email"],
  sortFields: ["createdAt", "updatedAt"],
};


 const User = mongoose.model("User",userSchema);

export default User