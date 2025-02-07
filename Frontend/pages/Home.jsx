/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div className='h-screen w-full bg-cover bg-[url("../neurago-cover.jpg")] flex flex-col justify-between'>
        <h1 className='text-zinc-300 px-4 py-3 text-xl font-bold '>NeuraGO</h1>
        <div className='bg-zinc-100  p-5 rounded-t-2xl shadow-t-2xl shadow-black w-screen  '>
            <h2 className='text-2xl font-bold text-center '>Welcome to NeuraGO</h2>
            <Link to="/user-login" className='inline-block mt-[20px] bg-zinc-900 hover:bg-black text-white font-bold py-2 px-4 rounded-lg w-full text-center text-lg shadow-xl'>
                Continue &rarr;
            </Link>
        </div>
      </div>
    </div>
  )
}

export default Home