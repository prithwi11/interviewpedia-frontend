// ClientRouter.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/User/Home/Home';
import Header from '../Pages/User/Includes/Header';
import Category from '../Pages/User/Category/Category';
import CategoryDetails from '../Pages/User/Category/CategoryDetails';

const ClientRouter = () => {
  return (
    <>
      <Header />
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/category" element={<Category />} />
          <Route exact path='/category/:id' element={<CategoryDetails />} />
      </Routes>
    </>
  );
};

export default ClientRouter;
