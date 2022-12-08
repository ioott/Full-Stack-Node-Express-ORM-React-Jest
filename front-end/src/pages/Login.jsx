import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

export default function Login() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const redirectTarget = useMemo(() => ({
    customer: '/customer/products',
    seller: '/seller/orders',
    administrator: '/admin/manage',
  }), []);

  useEffect(() => {
    if (user?.role) {
      navigate(redirectTarget[user.role]);
    }
  }, [user?.role, navigate, redirectTarget]);

  return (
    <div>
      <h1>TryBeer</h1>
      <LoginForm redirectTarget={ redirectTarget[user?.role] } />
    </div>
  );
}
