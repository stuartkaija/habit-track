import Login from '../components/Login';
import { NavLink } from 'react-router-dom';

export default function Landing() {
  return (
    <div className='flex flex-col items-center h-full'>
      <h1 className='text-indigo-600 font-extrabold text-5xl m-4 lg:m-12'>Habit Track</h1>
      <Login />
      <p className='mt-auto mb-4'>Demo the app first <NavLink to={'/demo'} className='italic hover:underline'>here</NavLink>.</p>
    </div>
  )
}
