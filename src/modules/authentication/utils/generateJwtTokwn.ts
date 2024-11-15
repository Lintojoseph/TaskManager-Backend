import Configs from "../../../configs/configs"
import { Token } from "../../user/models/userToken";

const jwt=require("jsonwebtoken")

export const generateTokens=async(id:any)=>{
    try{
        const accesToken=jwt.sign({id},Configs.accessTokenSecret,{
            expiresIn: Configs.accessTokenTimout,
        })
        let refreshTOken;
        const userToken=await Token.findOne({
            user:id,
        })
        if(userToken){
            try{
                await jwt.verify(userToken.refreshToken, Configs.refreshTokenSecret)
                refreshTOken=userToken.refreshToken;
            }
            catch(e:any){}
        }
        if(!refreshTOken){
            refreshTOken=jwt.sign({id},Configs.refreshTokenSecret,{
                expiresIn:Configs.refreshTokenTimout,
        })}
        if(userToken){
            const s=await Token.deleteOne({_id:userToken.id})

        }
        await Token.create({
            user:id,
            refreshToken:refreshTOken,
        })
        return Promise.resolve({accesToken,refreshTOken})

    }catch(err){
        return Promise.reject(err)
    }
}