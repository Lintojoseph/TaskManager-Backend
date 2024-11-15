
import express, { Request, Response,Router } from "express";


const route:Router=express.Router()
route.get("/",(req:Request,res:Response)=>{
 res.json("APi is running")
})
export default route;