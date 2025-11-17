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
import BuyItem from './components/BuyItem.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import Orders from './components/Orders.jsx'
import Profile from './components/Profile.jsx'

const router = createBrowserRouter([
  {
    path: '/', element: <Home />, errorElement: <ErrorPage />,
     children: [
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
    path: '/api', element: <App />,  errorElement: <ErrorPage />,
    children: [
      {
        path: '/api', element: <CardContainer />
      },
      {
        path: '/api/profile', element: <Profile />
      },
      {
        path: '/api/carts', element: <CartContainer />
      },
      {
        path: '/api/orders', element: <Orders />
      },
      {
        path: '/api/buy-item', element: <BuyItem />
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>

)
