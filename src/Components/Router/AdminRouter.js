// AdminRouter.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Pages/Admin/Dashboard/Dashboard';
import Login from '../Pages/Admin/UserManagement/Login';
import Register from '../Pages/Admin/UserManagement/Register';
import Category from '../Pages/Admin/Category/Category';
import Question from '../Pages/Admin/Question/Question';
const AdminRouter = () => {
  return (
    <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/category" element={<Category />} />
        <Route exact path="/question" element={<Question />} />
    </Routes>
  );
};

export default AdminRouter;
