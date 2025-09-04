'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import logo from '../../public/logo.svg'
import { IoMenuOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
const Navbar = () => {

  const [toogle,setToogle] = useState<boolean>(false)

  function ChangeToogle() {
    setToogle((toggle)=>!toggle)
  }

  return (
    <>
    <div className=' flex justify-between py-5 px-2 lg:px-10'>
      <div>
        <Image width={250} src={logo} alt='logo'></Image>  
      </div>
      <div onClick={ChangeToogle} className=' flex justify-center items-center border rounded-full px-2 '>{<IoMenuOutline color='blue' size={30}></IoMenuOutline>}Menu</div>
    </div>
    <div>
      {
        toogle && <div className=' bg-white h-screen fixed top-0 z-50 w-full'>
          <div className=' absolute right-10 top-10'>{<RxCross1 size={30} onClick={ChangeToogle} />}</div>
        </div>
      }
    </div>
    </>
  )
}

export default Navbar
