import SignOut from './SignOut'

export default function Nav() {
  return (
    <nav className='p-2 flex items-center justify-between border-b border-slate-500'>
      <h1 className='font-extrabold text-xl md:text-3xl lg:text-5xl text-blue-600'>Habit Track</h1>
      <div>
        <SignOut />
      </div>
    </nav>
  )
}
