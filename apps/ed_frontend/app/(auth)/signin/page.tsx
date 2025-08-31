'use client'

import Link from "next/link"
import { FormEvent, useState } from "react"

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

  async function submitHandler(e:FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }


  return <>
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="">Email</label>
        <input type="email" name="email" placeholder="Enter the Email" value={userdata.email}  />
      </div>
      <div>
        <label htmlFor="">Username</label>
        <input type="text" name="username" placeholder="Enter the Username" value={userdata.username}  />
      </div>
      <div>
        <label htmlFor="">Password</label>
        <input type="password" name="password" placeholder="Enter the Password" value={userdata.password}  />
      </div>
      <div>
        <button type="submit">Signup</button>
        <div>Already Signup ? <span><Link href={'/signin'}>Signin</Link></span></div>
      </div>
    </form>   
  </>
}