import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { AuthProvider } from './lib/AuthProvider';
import { AlertContextProvider } from './lib/AlertContext';
import Root from './routes/Root';
import About from './routes/About';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: []
  },
  {
    path: 'about',
    element: <About />
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
