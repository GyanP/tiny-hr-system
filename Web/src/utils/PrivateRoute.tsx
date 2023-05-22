import { Navigate, Outlet } from "react-router-dom";
const PrivateRoutes = () => {
  let tokenFromLocalStorage = localStorage.getItem("isLoggedIn");
  return tokenFromLocalStorage ? <Outlet /> : <Navigate to="/" />;
};

export { PrivateRoutes };
