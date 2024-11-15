import { generateTokens } from "../utils/generateJwtTokwn"


export default class UserAuthenticatonService{
    jwtCreate=async(id:string)=>{
        return await generateTokens(id);
    }
}