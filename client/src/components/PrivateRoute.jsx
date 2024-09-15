import {Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoute() {
  const token = localStorage.getItem('authToken');

  if (!token) {
    // Se o token não existe, redireciona para a página de login
    return <Navigate to="/login" replace />;
  }

  // Se o token existe, renderiza os filhos
  return <Outlet />;

}