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
        },withCredentials:true
      })
      const message = res.data
      Cookies.set('userId',message.userid)
      localStorage.setItem('userId',message.userid)
    } catch (error:unknown) {
      console.log(`User Not Signup`);
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data || error.message);
      }
    }
  }


  return <div className="w-full h-screen flex justify-center items-center flex-col gap-y-5 ">
  <div className=" text-5xl  font-semibold text-white ">SIGNUP</div>
    <form   onSubmit={submitHandler} className= "   bg-white text-black p-6 min-w-[70vw] lg:min-w-[30vw] min-h-[40vh] lg:min-h-[70vh]  flex flex-col justify-center items-center gap-y-4 lg:gap-y-7 rounded-4xl">
      <div className=" flex flex-col gap-y-3 lg:w-72 ">
        <label className=" text-xl lg:text-2xl lg:font-extralight font-semibold" htmlFor="">Email</label>
        <input className="  border-b-2" type="email" name="email" placeholder="Enter the Email" value={userdata.email} onChange={changeHandler}  />
      </div>
      <div className=" flex flex-col gap-y-3 lg:w-72 ">
        <label className=" text-xl font-semibold lg:text-2xl lg:font-extralight"  htmlFor="">Username</label>
        <input className="  border-b-2"  type="text" name="username" placeholder="Enter the Username" value={userdata.username} onChange={changeHandler}   />
      </div>
      <div className=" flex flex-col gap-y-3 lg:w-72 ">
        <label className=" text-xl font-semibold lg:font-extralight lg:text-2xl"  htmlFor="">Password</label>
        <input className="  border-b-2"  type="password" name="password" placeholder="Enter the Password" value={userdata.password} onChange={changeHandler}  />
      </div>
      <div className=" flex flex-col justify-center items-center gap-y-3">
        <button type="submit" className=" bg-blue-600 text-white px-8 py-2 rounded-2xl lg:w-72">Signup</button>
        <div className=" font-extralight">Already Signup ? <span className=" text-blue-700 lg:hover:text-blue-900"><Link href={'/signin'}>Signin</Link></span></div>
      </div>
    </form>   
  </div>
}