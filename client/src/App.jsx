import {BrowserRouter, Route, Routes} from 'react-router-dom'
import User from './pages/User'
import PrivateRoute from './components/PrivateRoute'
import './App.css'
import Login from './components/Login'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route element={<PrivateRoute />}>
          <Route path='/user' element={<User />}/>
        </Route>  
      </Routes>
    </BrowserRouter>
  )
}

export default App
