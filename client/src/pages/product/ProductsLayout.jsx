import { Outlet, Link, useLocation } from "react-router-dom"
export default function ProductsLayout() {
  const { pathname } = useLocation();
  return (
    <main>
      <h1 className="text-blue-light ">Stock Products</h1>
      <div className="d-flex gap-3 border-bottom mt-3">
        <Link 
          to="/user/products" 
          className={`${pathname === '/user/products' ? "active" : ""} text-decoration-none text-white pb-1`}>
            Products
        </Link>
        <Link 
          to="/user/products/new" 
          className={`${pathname === '/user/products/new' ? "active" : ""} text-decoration-none text-white pb-1 `}>
            New Product
        </Link>
      </div>
      <Outlet />
    </main>
  )
}
