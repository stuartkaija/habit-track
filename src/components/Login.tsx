import { useState } from "react";
import isEmail from "validator/lib/isEmail";
import { supabase } from "../supabaseClient";

export default function Login() {
  const [hasAnAccount, setHasAnAccount] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const handleEmailInput = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setError(false);
    setEmail(event.target.value)
  }

  const handleLoginWithOtp = async () => {

    if (!isEmail(email)) {
      setError(true);
      return;
    } else {
      setError(false);
    }

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
    setLoading(false);
  }

  const handleLoginWithFacebook = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log('hey');
  }

  return (
    // <div className="flex flex-center items-center justify-center h-full">
    <div className="flex flex-col justify-between h-96 w-80 text-black bg-white p-2 rounded-lg">
      <h2 className="text-2xl font-bold">{hasAnAccount ? 'Login' : 'Sign Up'}</h2>
      <p className="">{hasAnAccount ? 'Sign in with your email via a magic link.' : 'Sign up with your email via a magic link.'}</p>
      <form className="" onSubmit={handleLoginWithOtp}>
        <input
          className="w-full p-2 mb-1 bg-slate-100 rounded-sm"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailInput}
        />
        <p className={`text-red-400 mb-2 font-bold text-sm ${error ? 'visible' : 'invisible'}`}>please enter a valid email</p>
        <button className={`${loading ? 'bg-indigo-100 hover:bg-indigo-100' : 'bg-indigo-300 hover:bg-indigo-500'} rounded-sm w-full p-2`} disabled={loading}>
          {loading ? 'Loading' : 'Send magic link'}
        </button>
      </form>
      <div className="flex flex-col">
        <button
          onClick={handleLoginWithGoogle}
          disabled={loading}
          className="p-2 mb-2 px-6 bg-slate-200 hover:bg-slate-400 rounded-sm"
        >
          Sign In With Google
        </button>
        <button
          onClick={handleLoginWithFacebook}
          disabled={loading}
          className="p-2 px-6 bg-slate-200 hover:bg-slate-400 rounded-sm"
        >
          Sign In With Facebook
        </button>
      </div>
      <div className="flex justify-between">
        <p>
          {hasAnAccount ? "Don't have an account yet?" : "Already have an account?"}
        </p>
        <button className="underline" onClick={() => setHasAnAccount((prev) => !prev)}>{hasAnAccount ? 'Sign Up' : 'Login'}</button>
      </div>
    </div>
    // </div>
  )
}
