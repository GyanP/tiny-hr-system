import React, { useEffect } from 'react';
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { MainLayout } from './layouts';
import { Routes, Route } from "react-router-dom";
import { ApplicationList, ApplyForm, Login } from './pages';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from "react-redux";
import { setLoginStateAction } from './redux/action/loginAction';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { LoggedInPrivateRoute } from './utils/LoggedInPrivateRoute';
import { PrivateRoutes } from './utils/PrivateRoute';

function App() {
  const dispatch: any = useDispatch();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      dispatch(setLoginStateAction((JSON.parse(isLoggedIn))))
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route element={<MainLayout />} >
          <Route path='/' Component={ApplyForm} />
          <Route element={<PrivateRoutes/>}>
              <Route path='/list' Component={ApplicationList} />
          </Route>
          <Route element={<LoggedInPrivateRoute/>}>
            <Route path='/login' Component={Login} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
