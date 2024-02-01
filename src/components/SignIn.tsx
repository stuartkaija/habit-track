import { useState } from 'react'
import { supabase } from '../supabaseClient';

export default function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const handleSignIn = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
      });
      if (error) {
        setError(error.message);
      } else {
        setIsSubmitted(true);
      }
    } catch(error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false);
    }
  }

  const handleInput = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setEmail((event.target as HTMLInputElement).value);
  }

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder='Your email'
          value={email}
          required={true}
          onChange={handleInput}
        />
        <button disabled={isLoading}>sign in</button>
      </form>
      {error && <p>An error occurred! {error}</p>}
      {isSubmitted && <p>Please check your email for login link</p>}
    </div>
  )
}
