import Login from '../components/Login';
import { NavLink } from 'react-router-dom';

export default function Landing() {
  return (
    <div className='flex flex-col'>
      <div className='flex flex-col items-center h-svh md:h-dvh'>
        <h1 className='text-indigo-600 font-extrabold text-5xl m-4 lg:m-12'>Habit Track</h1>
        <Login />
        <p className='mt-auto mb-4'>See the app first <a href={'#demo'} className='italic hover:underline'>here</a>.</p>
      </div>
      <div id='demo' className='h-svh md:h-dvh bg-blue-400'>
        <h2>DEMO</h2>
        <div>
          <p>video here of the app in action...?</p>
        </div>
      </div>
    </div>
  )
}