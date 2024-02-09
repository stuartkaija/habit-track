import { ReactNode } from "react";
import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../supabaseClient";
import { Session } from "@supabase/supabase-js";

const AuthContext = createContext<Session | null>(null);

const AuthProvider = ({ children }: { children: ReactNode}) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  console.log('AuthProvider')
  console.log(session);

  return (
    <AuthContext.Provider value={session}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };