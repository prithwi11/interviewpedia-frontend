// Routes.js
import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, redirect } from 'react-router-dom';
import AdminRouter from './AdminRouter';
import ClientRouter from './ClientRouter';
import Login from '../Pages/Admin/UserManagement/Login';
import Register from '../Pages/Admin/UserManagement/Register';

const AppRouter = () => {
  // const [isAdminUserLoggedIn, setIsAdminUserLoggedIn] = useState(false);
  const loginDetails = JSON.parse((window.localStorage.getItem('loginDetails')))
  let isAdminUserLoggedIn = false
  if (loginDetails) {
    isAdminUserLoggedIn = true   
  }
  else {
    isAdminUserLoggedIn = false
  }

  return (
    <Router>
      <Routes>
        <Route path="/admin-login" element={<Login />} />
        <Route path="/admin-register" element={<Register />} />
        <Route  path="/admin/*" element={isAdminUserLoggedIn? <AdminRouter /> : <Navigate to="/admin-login" />} />
        <Route path="/*" element={<ClientRouter />} />
      </Routes>      
    </Router>
  );
};

export default AppRouter;
