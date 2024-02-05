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
      className="bg-blue-500 hover:bg-blue-600 px-4 rounded text-white"
      onClick={handleLogout}
    >
      log out
    </button>
  )
}
