import express, {Application} from 'express'
const passport=require('passport')
import Configs from '../configs/configs';
const GoogleStrategy = require("passport-google-oauth20").Strategy;
import User from '../modules/user/models/User'


export class GoogleAuthentication{
    static initialise(app: Application){
        passport.use(
            new GoogleStrategy(
                {
                    clientID:Configs.googleClientId,
                    clientSecret:Configs.googleClientSecret,
                    callbackURL:Configs.googleCallbackUrl,
                    scope: ["profile", "email"],
                },
                async(accessTokenScret:any,refreshTokenScret:any,profile:any,done:any)=>{
                    try{
                        if (!profile.emails || profile.emails.length === 0) {
                            return done(new Error("Google account does not provide an email address"), null);
                          }
                  
                          const email = profile.emails[0].value;

                        let user=await User.findOne({googleId:profile.id,loginWithGoogle:true});
                        console.log(user,"iam from passport")

                        if(!user){
                            user=await User.create({
                                googleId:profile.id,
                                name:profile.displayName,
                                email,
                                isActive:true,
                                loginWithGoogle:true,

                            });
                        }
                        return done(null,user)
                    }catch(error){
                        return done(error,null)
                    }
                }
            )
        );
        passport.serializeUser((user:any,done:any)=>{
            done(null,user.id)
        });
        passport.deserializeUser(async(id:any,done:any)=>{
            done(null, false);
        })
    }
}


