// Routes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminRouter from './AdminRouter';
import ClientRouter from './ClientRouter';
import Login from '../Pages/Admin/UserManagement/Login';

const AppRouter = () => {
  const isAdminUserLoggedIn = false
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route  path="/admin/*" element={isAdminUserLoggedIn? <AdminRouter /> : <Navigate to="/login" />} />
        <Route path="/*" element={<ClientRouter />} />
      </Routes>      
    </Router>
  );
};

export default AppRouter;
