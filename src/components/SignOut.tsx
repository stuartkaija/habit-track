import { useState } from "react"
import { supabase } from "../supabaseClient";

export default function SignOut() {
  const [_isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogout = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      supabase.auth.signOut();
    } catch (error: unknown) {
      console.warn(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <button
      className="bg-teal-400 px-4 rounded text-teal-50"
      onClick={handleLogout}
    >sign out</button>
  )
}
