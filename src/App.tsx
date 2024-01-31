import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Auth from './Auth'
import AuthenticatedApp from './AuthenticatedApp';
import './App.css'

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <>
      <h1 className='font-extrabold text-blue-700'>Welcome to my application</h1>
      <div className='container'>
        {!session ? <Auth/> : <AuthenticatedApp/>}
      </div>
    </>
  )
}

export default App
