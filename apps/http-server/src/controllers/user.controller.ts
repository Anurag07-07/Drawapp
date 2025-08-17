import {SignupValidation,SigninValidation,CreateRoomValidation} from '@repo/common/types'
import {prisma} from '@repo/database/db'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


//Create a  Controller for Signup
export const Signup = async(req:Request,res:Response)=>{
  //Validation 
  const check = SignupValidation.safeParse(req.body)

  if (!check.success) {
    return res.status(400).json({
      message:check.error
    })
  }
  const {email,username,password} = req.body
  try {
    //Check if the User is present or not with the username
    console.log(`1`);
    
    const present = await prisma.user.findFirst({
      where:{
        username
      }
    })
    
    if (present) {
      return res.status(409).json({
        message:`User already present`
      })
    }else{
      //Create the User
      //Hash the password

      const hashedPassword = await bcrypt.hash(password,10)
      
      const user = await prisma.user.create({
        data:{
          username,
          password:hashedPassword,
          email
        }
      })

      return res.status(200).json({
        message:`User Created Successfully`,
        userid:user.id
      })
    }
  } catch (error) {
    res.status(500).json({
      message:`Internal Server Error`,
      error:error
    })
  }
}

export const Signin = async(req:Request,res:Response)=>{
  //Validation
  const check = SigninValidation.safeParse(req.body)
  if (!check.success) {
    return res.status(400).json({
      message:check.error
    })
  }
  const {username,password} = req.body 
  
  try {
    //Check if the user present or not
    const present = await prisma.user.findFirst({
      where:{
        username
      }
    })
    if (!present) {
      return res.status(404).json({
        message:`User not Present`
      })
    }else{
      //If present validate the password and then create a token
      const matchPassword = await bcrypt.compare(password,present.password)
      
      if (!matchPassword) {
        return res.status(401).json({
          message:`Password Not match`
        })
      }
      
      //Create a token
      const token = jwt.sign({
        id:present.id.toString() 
      },process.env.JWT_SECRET as string)
      
        //Token created send it to the user
        return res.status(201).json({
          message:"User Login Succesfully",
          token:token
        })
      }   
  } catch (error:any) {
    return res.status(500).json({
      message:`internal Server Error`,
      error:error
    })
  }
}

export const CreateRoom = async(req:Request,res:Response)=>{
  const createRoomSchemaCheck = CreateRoomValidation.safeParse(req.body)

  if (!createRoomSchemaCheck.success) {
    return res.status(400).json({
      error:createRoomSchemaCheck.error
    })
  }

  const {roomname} = req.body
  const userId = req.userId

  if (!userId) {
    throw new Error("User ID is required to create a room");
  }


  try {
   const room = await prisma.room.create({
    data:{
      slug:roomname,
      adminId:userId
    }
   })
   return res.status(201).json({
    message:`Room Created Successfully`,
    roomid:room.id
   })
  } catch (error:any) {
    return res.status(500).json({
      message:`Internal Server Error`,
      error:error
    })
  }
}