import Image from 'next/image'
import React from 'react'
import Logo from '../images/logo.svg'

const Navbar = () => {
  return (
    <div className=' bg-white w-full h-screen'>
      <Image alt='logo' src={Logo}></Image>
    </div>
  )
}

export default Navbar