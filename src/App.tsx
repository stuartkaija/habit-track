import { useSession } from './lib/SessionProvider';
import Login from './components/Login'
import AuthenticatedApp from './AuthenticatedApp';

function App() {
  const session = useSession();
  // console.log('APP!')
  // console.log(session);

  return (
    <div className='bg-white h-dvh'>
      {!session ?
        <Login />
        :
        <AuthenticatedApp />
      }
    </div>
  )
}

export default App
