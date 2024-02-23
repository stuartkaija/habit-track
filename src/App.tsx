import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { AuthProvider } from './lib/AuthProvider';
import { AlertContextProvider } from './lib/AlertContext';
import Root from './routes/Root';
import About from './routes/About';
import Demo from './routes/Demo';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'signup',
        element: <div>sign up</div>
      },
      {
        path: 'login',
        element: <div>login</div>
      }
    ]
  },
  {
    path: 'about',
    element: <About />
  },
  {
    path: 'demo',
    element: <Demo />
  },
])

function App() {
  return (
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AlertContextProvider>
          <RouterProvider router={router} />
        </AlertContextProvider>
      </LocalizationProvider>
    </AuthProvider>
  )
}

export default App
