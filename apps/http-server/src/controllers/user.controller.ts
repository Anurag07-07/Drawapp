import {client} from '@repo/database/database'
import { Response,Request } from 'express'

export const Signup = async(req:Request,res:Response)=>{
  const {username,email,password} = req.body
  await client.user.create({
    data:{
      username,
      email,
      password
    }
  })

  console.log(`working`);
  

  res.status(200).json({
    message:`User Created Succesfully`
  })
}