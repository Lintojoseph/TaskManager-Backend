import express, {Application} from 'express'
const passport=require('passport')
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
import User from '../modules/user/models/User'
const bcrypt=require('bcryptjs')
import Configs from '../configs/configs';



export class passportAuthentication {
    static initialise=(app:Application)=>{
        app.use(passport.initialize())
        passport.use(
            new LocalStrategy({usernameField:'username'}, this.localAuthentication)
        )
        passport.use(
            new JwtStrategy(
                {
                jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey:Configs.accessTokenSecret,
                },
                this.jwtAuthentication
            )
        )
    }

    static localAuthentication = async (
        username: string,
        password: string,
        done: any
    ) => {
        try {
            const user = await User.findOne({ mobileNo:username, isActive: true }).select("+password");
            console.log(user,"userrrr")
            if (!user) {
                // If user is not found, call done and return to prevent further processing
                return done(null, false);
            }
            const result = await bcrypt.compare(password, user.password);
            if (!result) {
                // If password does not match, call done and return
                return done(null, false);
            }
            // If everything is correct, return the user
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    };
    
    static jwtAuthentication=async(jwt_payload:any,done:any)=>{
        try{
            const user=await User.findOne({_id:jwt_payload.id,isActive:true})
            if(!user){
                return done(null,false)
            }
            return done(null,user)
        }
        catch(e){
            return done(null,false);
        }
    }
}

