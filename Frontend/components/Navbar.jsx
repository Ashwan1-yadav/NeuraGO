/* eslint-disable no-unused-vars */
import React from 'react'

const Navbar = () => {
  return (
    <>
    <div className='navbar h-12 p-4 bg-black-10 flex justify-around items-center bg-black text-white'>
        <div className='left'>
            <h1 className='text-3xl font-bold font-sans'>Neura Go</h1>
        </div>
        <div className='right flex gap-x-4 text-sm'>
            <p>Home</p>
            <p>Services</p>
            <p>About</p>
            <p>Contact Us</p>
        </div>
        <div className='buttons flex gap-x-2'>
            <button className='bg-zinc-700 text-white px-2 py-1 rounded-md text-sm'>Sign Up</button>
            <button className='bg-zinc-700 text-white px-2 py-1 rounded-md text-sm' >Sign In</button>
            
        </div>
    </div>
    </>
  )
}

export default Navbar