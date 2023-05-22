import { Navigate, Outlet } from "react-router-dom";
const LoggedInPrivateRoute = () => {
  let tokenFromLocalStorage = localStorage.getItem("isLoggedIn");
  return !tokenFromLocalStorage ? <Outlet /> : <Navigate to="/" />;
};

export { LoggedInPrivateRoute };
