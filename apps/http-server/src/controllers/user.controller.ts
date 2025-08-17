import {SignupValidation,SigninValidation} from '@repo/common/types'
import {prisma} from '@repo/database/db'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const JWT_SECRET = 'excildraw0707'

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
      
      await prisma.user.create({
        data:{
          username,
          password:hashedPassword,
          email
        }
      })

      return res.status(200).json({
        message:`User Created Successfully`
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
      console.log("Password: "+present.password);
      const matchPassword = await bcrypt.compare(password,present.password)

      if (!matchPassword) {
        return res.status(401).json({
          message:`Password Not match`
        })
      }

        //Create a token
        const token = jwt.sign({
          id:present.id 
        },JWT_SECRET as string)

        //Token created send it to the user
        return res.status(201).json({
          message:"User Login Succesfully",
          token:token
        })
      }   
  } catch (error) {
    return res.status(500).json({
      message:`internal Server Error`,
      error:error
    })
  }
}

