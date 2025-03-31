/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div className='h-screen w-full bg-cover bg-indigo-100 flex flex-col justify-between'>
        <h1 className='text-zinc-800 flex items-center  px-4 py-3 text-2xl font-bold '>Neura <span className='text-indigo-600'>G</span><span className='text-indigo-500'><img src="../GO.svg" alt="neura-logo" className='w-5 h-5' /></span></h1>
        <div>
          <img src="../homeCar.png" alt="neura-logo" className='w-68 mx-auto' />
          <p className='text-center text-zinc-800 font-bold text-xl mt-4'>  
          Enjoy your <span className='text-indigo-500'>hussle-free</span> journey.          </p>
        </div>
        <div className='bg-indigo-100 p-5 rounded-t-2xl shadow-t-2xl shadow-black w-screen '>
            <Link to="/user-login" className='inline-block mt-[20px] bg-[#535CE8] hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg w-full text-center text-lg shadow-xl'>
                Get Started &rarr;
            </Link>
        </div>
      </div>
    </div>
  )
}

export default Home