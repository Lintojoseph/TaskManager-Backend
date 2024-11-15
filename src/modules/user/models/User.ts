
import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
    name:{type:String,required:true,unique:false,maxLength:100},
    mobileNo: { type: String, required: true, unique: true, maxLength: 20 },
    password:{type:String,required:true,maxLength:150,select:false},

    isSuperAdmin: {
        type: Boolean,
        required: false,
        default: false,
      },
      isActive: {
        type: Boolean,
        required: true,
        default: false,
      },
},
{ timestamps:true }
);

 const User = mongoose.model("User",userSchema);

export default User