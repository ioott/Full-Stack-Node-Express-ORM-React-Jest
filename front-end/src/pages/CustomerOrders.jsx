import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import OrdersCard from '../components/OrdersCard';

export default function CustomerCheckout() {
  const { id } = JSON.parse(localStorage.getItem('user'));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/customer/${id}/orders`)
      .then((response) => {
        // console.log(response.data);
        setOrders(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div>
      <NavBar />
      { orders.length > 0 && orders.map((order, index) => (
        <OrdersCard key={ index } orderInfo={ order } />
      ))}
    </div>
  );
}
