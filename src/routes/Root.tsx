import { AuthProvider, useAuth } from "../lib/AuthProvider";
import Login from "../components/Login";
import AuthenticatedApp from "../AuthenticatedApp";
import Landing from "./Landing";

export default function Root() {
  const auth = useAuth();

  console.log(auth)

  return (
      <div className='bg-white h-dvh'>
        {!auth ?
          // <Login />
          <Landing/>
          :
          <AuthenticatedApp />
        }
      </div>
  )
}