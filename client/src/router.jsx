import { createBrowserRouter } from 'react-router-dom'
import RootLayout from './pages/RootLayout'
import ProductsLayout from './pages/product/ProductsLayout'
import Products from './pages/product/Products'
import NewProduct from './pages/product/NewProduct'
import UpdateProduct from './pages/product/UpdateProduct'
import NewCategory from './pages/product/NewCategory'
import Home from  './pages/Home'

const router = createBrowserRouter([{
  path: '/', 
  element: <RootLayout />,
  children: [
    { index: true, element: <Home /> },
    {
      path: "products",
      element: <ProductsLayout />,
      children: [
        { index: true, element: <Products />},
        { path: 'new', element: <NewProduct />},
        { path: ':id/update', element: <UpdateProduct />},
        { path: 'category/new', element: <NewCategory />}
      ]
    }
  ]
}])

export default router;