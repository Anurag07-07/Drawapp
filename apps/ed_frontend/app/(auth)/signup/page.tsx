'use client'

import axios from "axios"
import Cookies from 'js-cookie'
import Link from "next/link"
import { ChangeEvent, FormEvent, useState } from "react"

interface IUser{
  email:string,
  password:string,
  username:string
}

export default function Signin() {

  const [userdata,setUserData] = useState<IUser>({
    username:"",
    email:"",
    password:""
  })

  function changeHandler(e:ChangeEvent<HTMLInputElement>) {
    const {name,value} = e.target
    setUserData({...userdata,[name]:value})
  }

  async function submitHandler(e:FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:3000/api/v1/signup',userdata,{
        headers:{
          "Content-Type":'application/json'
        }
      })
      const message = res.data
      Cookies.set('userId',message.userid)
    } catch (error:unknown) {
      console.log(`User Not Signup`);
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data || error.message);
      }
    }
  }


  return <>
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="">Email</label>
        <input type="email" name="email" placeholder="Enter the Email" value={userdata.email} onChange={changeHandler}  />
      </div>
      <div>
        <label htmlFor="">Username</label>
        <input type="text" name="username" placeholder="Enter the Username" value={userdata.username} onChange={changeHandler}   />
      </div>
      <div>
        <label htmlFor="">Password</label>
        <input type="password" name="password" placeholder="Enter the Password" value={userdata.password} onChange={changeHandler}  />
      </div>
      <div>
        <button type="submit">Signup</button>
        <div>Already Signup ? <span><Link href={'/signin'}>Signin</Link></span></div>
      </div>
    </form>   
  </>
}