// ClientRouter.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/User/Home/Home';
import Login from '../Pages/User/User/Login';
import Register from '../Pages/User/User/Register';

const ClientRouter = () => {
  return (
    <Routes>
        <Route exact path="/" element={<Home />} />
    </Routes>
  );
};

export default ClientRouter;
