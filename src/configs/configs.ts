import dotenv from 'dotenv'
dotenv.config()

export default class Configs{
    static port=process.env.PORT;
    static domain=process.env.DOMAIN
    static serverUrl=process.env.SERVER_URL    

    // mongodb

    static mongohost=process.env.MONGO_HOST

    // Authentication

    static accessTokenSecret=process.env.ACCESS_TOKEN_SECRET;
    static refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    static accessTokenTimout = process.env.ACCESS_TOKEN_TIMOUT;
    static refreshTokenTimout = process.env.REFRESH_TOKEN_TIMOUT;

    // google Authentication

    static googleClientId=process.env.GOOGLE_CLIENT_ID;
    static googleClientSecret=process.env.GOOGLE_CLIENT_SECRET;
    static googleCallbackUrl = process.env.GOOGLE_CALLBACK_URL;


}