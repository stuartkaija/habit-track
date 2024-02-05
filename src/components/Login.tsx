import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = async (event: React.SyntheticEvent) => {
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

  return (
    <div className="flex flex-center items-center justify-center h-full">
    <div className="bg-teal-100 p-2 rounded-md">
      <h1 className="">Login</h1>
      <p className="">Sign in via magic link with your email below</p>
      <form className="" onSubmit={handleLogin}>
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
    </div>
  </div>
  )
}
