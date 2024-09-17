import { createBrowserRouter, Navigate } from 'react-router-dom'
import RootLayout from './pages/RootLayout'
import ProductsLayout from './pages/product/ProductsLayout'
import Products from './pages/product/Products'
import NewProduct from './pages/product/NewProduct'
import UpdateProduct from './pages/product/UpdateProduct'
import Home from  './pages/Home'
import Login from './pages/Login'
import PrivateRoute from './components/PrivateRoute'

const router = createBrowserRouter([
  
  {
    path: '/', 
    element: <PrivateRoute />,
    children: [
      {
        path: '/', 
        element: <Navigate to='/user' replace/>
      },
      {
        path: 'user', 
        element: <RootLayout />,
        children: [
          {index: true, element:<Home />},
          {
            path: 'products', element: <ProductsLayout />,
            children: [
              { index: true, element: <Products />},
              { path: 'new', element: <NewProduct />},
              { path: 'update/:id', element: <UpdateProduct />}
            ]
          }
        ] 
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  
])

export default router;