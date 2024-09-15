import { Link, Outlet,} from "react-router-dom"
export default function RootLayout() {

  
  return (
    <div className="container">
      <header className="d-flex align-items-center pt-3 justify-content-between">
        <div className="">
          <Link className="text-white text-decoration-none fs-4" to="/user">Stock Manager</Link>
        </div>
        <nav className="">
          <Link to="/user" className= "btn btn-outline-light m-2">Home</Link>
          <Link to="/user/products" className= "btn btn-outline-light m-2">Products</Link>
        </nav>
      </header>
     
      <main className="">
        <div className="mt-4">
          <Outlet />
        </div>
      </main>

      <footer className="text-white text-center p-2 fixed-bottom">
        <p>Copyright &copy; 2024</p>
      </footer>
    </div>
  )
}
