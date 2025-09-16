import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // ví dụ state toàn cục
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("APP_TOKEN") || "");
  const [theme, setTheme] = useState("light");

  // lưu token vào localStorage mỗi khi thay đổi
  useEffect(() => {
    if (token) {
      localStorage.setItem("APP_TOKEN", token);
    } else {
      localStorage.removeItem("APP_TOKEN");
    }
  }, [token]);

  const login = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
  };

  const logout = () => {
    setUser(null);
    setToken("");
  };

  const value = {
    user,
    setUser,
    token,
    setToken,
    theme,
    setTheme,
    login,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// custom hook để dùng nhanh
export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
