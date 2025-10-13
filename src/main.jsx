import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import CardContainer from './components/CardContainer.jsx'
import CartContainer from './components/CartContainer.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import Intro from './components/Intro.jsx';
import VerifyUser from './components/VerifyUser.jsx'

const router = createBrowserRouter([
  {
    path: '/', element: <Home />, children: [
      {
        path:'/', element: <Intro/>
      },
      {
        path: '/signin', element: <Login/>
      },
      {
        path: '/signup', element: <SignUp/>
      },
      {
        path: '/verify-user', element: <VerifyUser/>
      }
    ]
  },
  {
    path: '/api', element: <App />, children: [
      {
        path: '/api', element: <CardContainer />
      },
      {
        path: '/api/carts', element: <CartContainer />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
