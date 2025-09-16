// src/services/axiosClient.js
import axios from "axios";

/**
 * Simple axios client with request/response interceptors.
 * - baseURL from import.meta.env.VITE_API_URL || '/api'
 * - automatic Authorization header if token present
 * - allows registering an authErrorHandler (e.g. to logout or redirect)
 */

/* ---------- configuration ---------- */
const API_BASE = import.meta.env.VITE_API_URL || "/api";

const axiosClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  // timeout: 15000, // tùy chọn
});

/* ---------- mutable auth token storage ---------- */
// prefer using setAuthToken(token) to set token for runtime usage.
// fallback to reading from localStorage if not set.
let runtimeToken = null;
export function setAuthToken(token) {
  runtimeToken = token;
  // optionally persist:
  if (token == null) {
    localStorage.removeItem("APP_TOKEN");
  } else {
    localStorage.setItem("APP_TOKEN", token);
  }
}
export function clearAuthToken() {
  runtimeToken = null;
  localStorage.removeItem("APP_TOKEN");
}

/* ---------- auth error handler (register from AppProvider) ---------- */
let authErrorHandler = null;
export function onAuthError(fn) {
  authErrorHandler = fn;
}

/* ---------- request interceptor ---------- */
axiosClient.interceptors.request.use(
  (config) => {
    // token priority: runtimeToken > localStorage
    const token = runtimeToken ?? localStorage.getItem("APP_TOKEN");
    if (token) {
      config.headers = config.headers || {};
      // set Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ---------- response interceptor ---------- */
axiosClient.interceptors.response.use(
  (response) => response, // pass through successful responses
  async (error) => {
    // If response exists, you can inspect status
    const status = error?.response?.status;

    // Common handling for 401 Unauthorized
    if (status === 401) {
      // call registered handler (e.g. to logout and redirect to /login)
      if (typeof authErrorHandler === "function") {
        try {
          authErrorHandler(error);
        } catch (e) {
          // swallow handler error
          // eslint-disable-next-line no-console
          console.error("authErrorHandler error:", e);
        }
      }
      // Optionally clear token
      clearAuthToken();
    }

    // you can add auto-refresh-token logic here (complex) if you have refresh tokens

    return Promise.reject(error);
  }
);

export default axiosClient;



// dùng trong AppProvider để khởi tạo runtime token và đăng ký authErrorHandler
// import { setAuthToken, onAuthError, clearAuthToken } from "@/services/axiosClient";
// import { useNavigate } from "react-router-dom";

// function AppProvider({ children }) {
//   const navigate = useNavigate();

//   useEffect(() => {
//     // khởi tạo runtime token từ localStorage
//     setAuthToken(localStorage.getItem("APP_TOKEN"));

//     // đăng ký handler cho 401
//     onAuthError(() => {
//       // ví dụ: clear state user, chuyển về login
//       clearAuthToken();
//       // setUser(null) hoặc dispatch logout...
//       navigate("/login", { replace: true });
//     });
//   }, []);
// }