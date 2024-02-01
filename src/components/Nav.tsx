import SignOut from './SignOut'

export default function Nav() {
  return (
    <nav className='p-2 flex justify-between bg-teal-50'>
      <h1 className='font-extrabold text-blue-600'>Welcome to my application</h1>
      <SignOut/>
    </nav>
  )
}
