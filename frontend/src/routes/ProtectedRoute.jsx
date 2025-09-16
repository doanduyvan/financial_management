import {  Outlet } from "react-router-dom";
import Login from "@/pages/Login";
function ProtectedRoute() {
  // Ví dụ kiểm tra login: thay bằng logic thực tế của bạn
  const isAuthenticated = false;

  return isAuthenticated ? <Outlet /> : <Login />;
}

export default ProtectedRoute;
