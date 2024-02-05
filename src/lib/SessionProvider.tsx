import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../supabaseClient";

const SessionContext = createContext(null);

const SessionProvider = (props: any) => {
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
    <SessionContext.Provider value={session} {...props}/>
  )
}

const useSession = () => {
  const context = useContext(SessionContext);
  return context;
}

export { SessionProvider, useSession };