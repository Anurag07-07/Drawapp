import Link from 'next/link'
import React from 'react'
const Hero = () => {
  return (
    <div className=' h-screen flex justify-center items-center flex-col gap-y-10'>
      <div className=' flex flex-col justify-center items-center gap-y-7'>
        <div className=' text-5xl font-semibold'>How to start with</div>
        <span className=' font-bold text-7xl bg-light-green-100 shadow-2xl shadow-light-green-100 rounded-2xl px-3 '>DRAW</span>
      </div>
      <div className=' flex justify-center items-center flex-col  font-extralight'>
        <div>Online whiteboard helps you to get your idea out there,</div>
        <div>co-create solutions and show it to others.</div>
      </div>
      <button className=' bg-blue-500 px-7 py-3 rounded-2xl font-extralight text-white'><Link href={`http://localhost:3002/signup`}>Just Start Drawing</Link></button>
      <video autoPlay controls loop muted  className=' w-96 h-52 rounded-2xl'>
       <source type='video/mp4' src="/create_video.mp4" />
      </video>
    </div>
  )
}

export default Hero
