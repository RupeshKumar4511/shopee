import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import CardContainer from './components/CardContainer.jsx'
import CartContainer from './components/CartContainer.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'


const router = createBrowserRouter([
  {
  path:'/',element:<App/>,children:[
    {
      path:'/',element:<CardContainer/>
    },
    {
      path:'/carts',element:<CartContainer/>
    }
  ]
}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}  />
    </Provider>
  </StrictMode>,
)
