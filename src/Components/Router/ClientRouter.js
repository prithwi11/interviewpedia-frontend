// ClientRouter.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/User/Home/Home';

const ClientRouter = () => {
  return (
    <Routes>
        <Route exact path="/" element={<Home />} />
    </Routes>
  );
};

export default ClientRouter;
