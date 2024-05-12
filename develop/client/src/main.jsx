import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Home from './pages/Home.jsx'

import Profile from './pages/Profile.jsx'
import PlantPage from './pages/PlantForm.jsx'
import TaskPage from './pages/TaskList.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Home />
      }, 
      {
        path: '/me',
        element: <Profile />
      },
      {
        path: '/plantform',
        element: <PlantPage />
      },
      {
        path: '/tasklist',
        element: <TaskPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
