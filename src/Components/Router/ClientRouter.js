// ClientRouter.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/User/Home/Home';
import Header from '../Pages/User/Includes/Header';

const ClientRouter = () => {
  return (
    <>
      <Header />
      <Routes>
          <Route exact path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default ClientRouter;
