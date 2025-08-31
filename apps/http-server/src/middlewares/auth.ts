import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config({ path: "../../.env" }) 

interface JwtPayload{
  id:string
}

const authMiddleware = async(req:Request,res:Response,next:NextFunction)=>{
  try {
    //Parse the token from the header
    const value = req.headers.authorization || req.cookies?.token
    //Get the Token 
    const token = value?.startsWith("Bearer ") ? value.split(" ")[1] : value;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    //Decode or Verify the token
    const decoded = jwt.verify(token,process.env.JWT_SECRET as string) as JwtPayload
    if (!decoded) {
      return res.status(401).json({
        message:`Unauthorized Token`
      })
    }
       req.userId = decoded.id
       next() 
    
  } catch (error:any) {
    return res.json(500).json({
      message:`Internal Server error`,
      error:error
    })    
  }
}

export default authMiddleware