import { NavLink } from 'react-router-dom'
import { getYear } from 'date-fns'
import SignOut from './SignOut'

export default function Nav() {
  const today = new Date()
  return (
    <nav className='p-2 flex items-center justify-between border-b border-slate-500'>
      <h1 className='font-extrabold text-xl md:text-3xl lg:text-5xl text-blue-700'>Habit Track - {getYear(today)}</h1>
      <nav>
        <NavLink className='m-4 hover:underline transition-all' to='/about'>About</NavLink>
        <SignOut />
      </nav>
    </nav>
  )
}
