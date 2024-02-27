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
      className="border border-slate-800 rounded-sm hover:bg-slate-400 hover:text-white m-1 px-3 py-1 w-24 md:w-36 text-black transition-colors"
      onClick={handleLogout}
    >
      Sign Out
    </button>
  )
}
