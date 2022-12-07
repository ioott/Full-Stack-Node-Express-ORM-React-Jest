import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';
import DetailsTable from '../components/DetailsTable';

function OrderDetails() {
  const { id } = useParams();
  const [orderInfo, setOrderInfo] = useState();

  useEffect(() => {
    axios.get(`http://localhost:3001/customer/orders/${id}`)
      .then((response) => {
        setOrderInfo(response);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div>
      <NavBar />
      { orderInfo?.data && <DetailsTable orderInfo={ orderInfo.data } /> }
    </div>
  );
}

export default OrderDetails;
