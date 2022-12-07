import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';
import DetailsTable from '../components/DetailsTable';

function OrderDetails() {
  const user = JSON.parse(localStorage.getItem('user'));
  const { id } = useParams();
  const [orderInfo, setOrderInfo] = useState();
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    console.log('atualizou');
    if (user.role && update) {
      axios.get(`http://localhost:3001/${user.role}/orders/${id}`)
        .then((response) => {
          setUpdate(false);
          setOrderInfo(response);
        })
        .catch((error) => console.log(error));
    }
  }, [id, user.role, update]);

  return (
    <div>
      <NavBar />
      { orderInfo?.data && (
        <DetailsTable
          orderInfo={ orderInfo.data }
          role={ user.role }
          setUpdate={ setUpdate }
        />) }
    </div>
  );
}

export default OrderDetails;
