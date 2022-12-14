import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import OrdersCard from '../components/OrdersCard';

export default function Orders() {
  const { id, role } = JSON.parse(localStorage.getItem('user'));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (role) {
      axios.get(`http://localhost:3001/${role}/${id}/orders/?role=${role} `)
      // , {
        // data: {
        //   role,
        // },
      // })
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [id, role]);

  return (
    <div>
      <NavBar />
      { orders.length > 0 && orders.map((order, index) => (
        <OrdersCard key={ index } orderInfo={ order } role={ role } />
      ))}
    </div>
  );
}
