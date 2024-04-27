// Routes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminRouter from './AdminRouter';
import ClientRouter from './ClientRouter';
import Login from '../Pages/Admin/UserManagement/Login';
import Register from '../Pages/Admin/UserManagement/Register';

const AppRouter = () => {
  const loginDetails = (window.localStorage.getItem('loginDetails'))
  let  isAdminUserLoggedIn = true
  if (loginDetails) {
     isAdminUserLoggedIn = true  
  }
  else {
     isAdminUserLoggedIn = false
  }
  return (
    <Router>
      <Routes>
        <Route path="/admin-login" element={isAdminUserLoggedIn === false? <Login /> : <Navigate to="/admin" />} />
        <Route path="/admin-register" element={isAdminUserLoggedIn === false? <Register /> : <Navigate to="/admin" />}  />
        <Route  path="/admin/*" element={isAdminUserLoggedIn? <AdminRouter /> : <Navigate to="/admin-login" />} />
        <Route path="/*" element={<ClientRouter />} />
      </Routes>      
    </Router>
  );
};

export default AppRouter;
