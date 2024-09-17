import { RouterProvider } from 'react-router-dom'
import router from './router'
import { StockContextProvider } from './context/StockContext'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css'

function App() {

  return (
    <StockContextProvider>
      <RouterProvider router={router} />
      <ToastContainer />

    </StockContextProvider>
  )
}

export default App
