import {UserValidation} from '@repo/common/types'
import {client} from '@repo/database/database'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

//Create a  Controller for Signup
export const Signup = async(req:Request,res:Response)=>{
  //Validation 
  const check = UserValidation.safeParse(req.body)

  if (!check.success) {
    return res.status(400).json({
      message:check.error
    })
  }
  const {email,username,password} = req.body
  try {
    //Check if the User is present or not with the username
    const present = await client.user.findFirst({
      where:{
        email
      }
    })
    console.log(present);
    
    if (present) {
      return res.status(409).json({
        message:`User already present`
      })
    }else{
      //Create the User

      //Hash the password

      const salt = await bcrypt.genSalt()
      const hash = await bcrypt.hash(password,salt)

      await client.user.create({
        data:{
          username,
          password:hash,
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

