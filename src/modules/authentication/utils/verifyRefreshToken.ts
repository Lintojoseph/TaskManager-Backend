import { rejects } from "assert"
import { resolve } from "path"
import { Token } from "../../user/models/userToken"
import Configs from "../../../configs/configs"
import { error } from "console"
const jwt = require("jsonwebtoken");

const verifyRefreshToken=(refreshToken:string)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            await Token.findOne({
                refreshToken:refreshToken,
            });
            jwt.verify(
                refreshToken,
                Configs.refreshTokenSecret,
                (error:any,payload:any)=>{
                    if(error){
                        return reject({message:'invalid refresh token'})
                    }
                    return resolve(payload);
                }
            );
        }catch(e){
            return reject({message:"invalid refresh token"})
        }
    });
}

export default verifyRefreshToken;