import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from './lib/AuthProvider';
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
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
