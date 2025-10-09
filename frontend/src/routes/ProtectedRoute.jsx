import { Outlet } from 'react-router-dom';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
function ProtectedRoute() {
  // Ví dụ kiểm tra login: thay bằng logic thực tế của bạn
  const { user } = useApp();
  const isAuthenticated = false;
  const [isPageLogin, setIsPageLogin] = useState(true);

  return user ? (
    <Outlet />
  ) : isPageLogin ? (
    <Login setIsPageLogin={setIsPageLogin} />
  ) : (
    <Register setIsPageLogin={setIsPageLogin} />
  );
}

export default ProtectedRoute;
