import React from 'react';
import Login from '../components/Login';

export default function Landing() {
  return (
    <div className='flex flex-col lg:flex-row lg:justify-between'>
      <div className='flex justify-center items-center bg-blue-800 lg:w-1/2 lg:h-dvh'>
        <h1 className='text-white font-extrabold text-5xl'>Habit Track</h1>
      </div>
      <div className='flex justify-center items-center lg:w-1/2 md:h-dvh'>
        <Login />
      </div>
    </div>
  )
}
