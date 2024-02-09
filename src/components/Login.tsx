import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleLoginWithOtp = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      alert(error.message)
    } else {
      alert('Check your email for the login link')
    }
    setLoading(false)
  }

  const handleLoginWithGoogle = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })

    if (error) {
      alert(error.message)
    } else {
      console.log(data)

    }
  }

  return (
    <div className="flex flex-center items-center justify-center h-full">
      <div className="bg-teal-100 p-2 rounded-md">
        <p className="">Login</p>
        <p className="">Sign in via magic link with your email below</p>
        <form className="" onSubmit={handleLoginWithOtp}>
          <div>
            <input
              className=""
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button className='' disabled={loading}>
              {loading ? <span>Loading</span> : <span>Send magic link</span>}
            </button>
          </div>
        </form>
        <button
          onClick={ handleLoginWithGoogle }
          className="p-2 px-6 bg-gray-200 hover:bg-gray-400"
        >Sign In With Google</button>
      </div>
    </div>
  )
}
