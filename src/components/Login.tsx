import { useState } from "react";
import isEmail from "validator/lib/isEmail";
import { supabase } from "../supabaseClient";
import { useAlert } from "../lib/AlertContext";

export default function Login() {
  const [hasAnAccount, setHasAnAccount] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const alert = useAlert();

  const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setError(false);
    setEmail(event.target.value)
  }

  const handleLoginWithOtp = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!isEmail(email)) {
      setError(true);
      return;
    } else {
      setError(false);
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      alert.error(`Error: ${error.message}`)
    } else {
      alert.success('Check your email for a login link!')
    }

    setLoading(false)
  }

  const handleLoginWithGoogle = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })

    if (error) {
      alert.error(error.message)
    }

    setLoading(false);
  }

  // const handleLoginWithFacebook = async (event: React.SyntheticEvent) => {
  //   event.preventDefault();
  //   console.log('handling login with facebook');
  // }

  return (
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
        <p className={`text-red-500 mb-2 font-bold text-sm ${error ? 'visible' : 'invisible'}`}>please enter a valid email</p>
        <button className={`my-1 px-3 py-2 w-full rounded-sm border border-slate-800 transition-colors ${loading ? 'bg-indigo-100 hover:bg-indigo-100' : ' hover:bg-indigo-500 hover:text-white'}`} disabled={loading}>
          {loading ? 'Loading' : 'Send magic link'}
        </button>
      </form>
      <div className="flex flex-col">
        <button
          onClick={handleLoginWithGoogle}
          disabled={loading}
          className={`px-3 py-2 mb-2 w-full rounded-sm border transition-colors ${loading ? buttonStyles.disabledOrLoading : buttonStyles.enabled}`}
        >
          Sign In With Google
        </button>
        {/* <button
          onClick={handleLoginWithFacebook}
          disabled={true}
          className={`px-3 py-2 mb-2 w-full rounded-sm border transition-colors ${loading ? buttonStyles.disabledOrLoading : buttonStyles.enabled}`}
        >
          Sign In With Facebook
        </button> */}
      </div>
      <div className="flex justify-between">
        <p>
          {hasAnAccount ? "Don't have an account yet?" : "Already have an account?"}
        </p>
        <button className="underline" onClick={() => setHasAnAccount((prev) => !prev)}>{hasAnAccount ? 'Sign Up' : 'Login'}</button>
      </div>
    </div>
  )
}

const buttonStyles = {
  disabledOrLoading: 'bg-slate-100 hover:bg-slate-100 hover:text-black border-slate-300',
  enabled: 'hover:bg-slate-400 hover:text-white border-slate-800'
}