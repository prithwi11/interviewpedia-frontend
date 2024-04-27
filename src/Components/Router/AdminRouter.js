// AdminRouter.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Pages/Admin/Dashboard/Dashboard';
import Category from '../Pages/Admin/Category/Category';
import Question from '../Pages/Admin/Question/Question';
import Header from '../Pages/Admin/Dashboard/Includes/Header';
import Sidebar from '../Pages/Admin/Dashboard/Includes/Sidebar';
const AdminRouter = () => {
  return (
    <>
    <Header />
    <Sidebar />
    <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/category" element={<Category />} />
        <Route exact path="/question" element={<Question />} />
    </Routes>
    </>
  );
};

export default AdminRouter;
