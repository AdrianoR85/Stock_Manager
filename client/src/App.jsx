import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import './App.css'
import Login from './components/Login'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/user' element={<Home />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
