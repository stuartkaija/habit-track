import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
// import Nav from './components/Nav';
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
    <div>
      {!session ? <Auth /> : <AuthenticatedApp />}
    </div>
  )
}

export default App
