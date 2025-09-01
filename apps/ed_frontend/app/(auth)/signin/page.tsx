'use client'

import Link from "next/link"
import { FormEvent, useState } from "react"

interface IUser{
  password:string,
  username:string
}

export default function Signin() {

  const [userdata,setUserData] = useState<IUser>({
    username:"",
    password:""
  })

  async function submitHandler(e:FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }


  return <div className=" flex flex-col justify-center items-center w-full h-screen">
    <div className=" text-5xl "  >SIGNIN</div>
    <form className= "   bg-white text-black p-6 min-w-[70vw] lg:min-w-[30vw] min-h-[40vh] lg:min-h-[70vh]  flex flex-col justify-center items-center gap-y-4 lg:gap-y-7 rounded-4xl"  onSubmit={submitHandler}>
      <div className=" flex flex-col gap-y-3 lg:w-72 ">
        <label className=" text-xl font-semibold lg:font-extralight lg:text-2xl"  htmlFor="">Username</label>
        <input className="  border-b-2"  type="text" name="username" placeholder="Enter the Username" value={userdata.username}  />
      </div>
      <div className=" flex flex-col gap-y-3 lg:w-72 ">
        <label className=" text-xl font-semibold lg:font-extralight lg:text-2xl"  htmlFor="">Password</label>
        <input className="  border-b-2"  type="password" name="password" placeholder="Enter the Password" value={userdata.password}  />
      </div>
      <div className="flex flex-col justify-center items-center">
        <button className=" bg-blue-600 text-white px-8 py-2 rounded-2xl lg:w-72"  type="submit">Signin</button>
        <div className=" font-extralight">Don&apos;t have Account ? <span className=" text-blue-700 lg:hover:text-blue-900"><Link href={'/signup'}>Signin</Link></span></div>
      </div>
    </form>   
  </div>
}