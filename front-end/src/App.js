import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerProducts from './pages/CustomerProducts';
import CustomerCheckout from './pages/CustomerCheckout';
import OrderDetails from './pages/OrderDetails';
import Orders from './pages/Orders';

function App() {
  return (
    <Routes>
      <Route path="/seller/orders/:id" element={ <OrderDetails /> } />
      <Route path="/seller/orders" element={ <Orders /> } />
      <Route path="/customer/orders/:id" element={ <OrderDetails /> } />
      <Route path="/customer/orders" element={ <Orders /> } />
      <Route path="/customer/checkout" element={ <CustomerCheckout /> } />
      <Route path="/customer/products" element={ <CustomerProducts /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/login" element={ <Login /> } />
      <Route exact path="/" element={ <Navigate to="/login" /> } />
    </Routes>
  );
}

export default App;
