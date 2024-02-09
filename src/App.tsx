import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from './lib/AuthProvider';
import Root from './routes/Root';
import About from './routes/About';
import Demo from './routes/Demo';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
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
  const session = useAuth();
  console.log('APP!')
  console.log(session);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
