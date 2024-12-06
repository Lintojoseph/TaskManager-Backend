import { createPasswordHash } from './../../src/modules/authentication/utils/createPasswordHash';
import { MongoMemoryServer } from "mongodb-memory-server";
import { passportAuthentication } from './../../src/passport/passortAuthentication';
import supertest from 'supertest'
import app from '../../src/app'
import mongoose from "mongoose";
import { assert } from "console";
import User from '../../src/modules/user/models/User';



const request=supertest(app)

let mongoserver:any;

beforeAll(async ()=>{
    passportAuthentication.initialise(app);
    mongoserver=await MongoMemoryServer.create();
    const mongoUri=await mongoserver.getUri()
    await mongoose.connect(mongoUri)
})

afterAll(async()=>{
    await mongoose.disconnect();
    await mongoserver.stop();
})

let refreshToken:any;
let adminToken:any;

describe("user creation and Login", ()=>{
    it('should insert a super-admin on db directly',async()=>{
        let userData:any={
            name:"admin",
            mobileNo:"123456789",
            isActive:true,
            isSuperAdmin:true,
            email:"lin@123@gmail.com"
        }
        userData.password=await createPasswordHash("admin@123")
        const user=await User.create(userData);
        expect(user).not.toEqual(null);
        expect(user.isSuperAdmin).toEqual(true);
        console.log(userData)
    });
    it("should return an acess and refresh jwt tokens for admin-user on successful login",async()=>{
        const credentials={
            username:"123456789",
            password:"admin@123",
        };
        const response=await request
        .post("/auth/jwt/create")
        .send(credentials);

        expect(response.status).toEqual(200);
        expect(response.body.success).toEqual(true);
        expect(response.body).toHaveProperty("data");
        expect(response.body.data).toHaveProperty("accesToken");
        expect(response.body.data).toHaveProperty("refreshTOken");
        adminToken=response.body.data.accesToken;
    })
})
