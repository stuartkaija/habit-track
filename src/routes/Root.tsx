import { useAuth } from "../lib/AuthProvider";
import AuthenticatedApp from "../AuthenticatedApp";
import Landing from "./Landing";

export default function Root() {
  const auth = useAuth();

  return (
      <div className='bg-white h-dvh'>
        {!auth ?
          <Landing/>
          :
          <AuthenticatedApp />
        }
      </div>
  )
}