import { Link, Outlet, useNavigate} from "react-router-dom"
export default function RootLayout() {

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('authToken');
    navigate('/login', { replace: true });
  }

  
  return (
    <div className="container">
      <header className="d-flex align-items-center pt-3 justify-content-between">
        <div className="">
          <Link className="text-white text-decoration-none fs-4" to="/user">Stock Manager</Link>
        </div>
        <nav className="">
          <Link to="/user" className= "btn btn-outline-light m-2">Home</Link>
          <Link to="/user/products" className= "btn btn-outline-light m-2">Products</Link>
          <button onClick={logout} className= "btn text-white m-2 bg-primary">Logout</button>
        </nav>
      </header>
     
      <main className="">
        <div className="mt-4">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
