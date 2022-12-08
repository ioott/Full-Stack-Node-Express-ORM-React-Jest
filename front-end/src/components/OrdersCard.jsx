import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function OrdersCard({ orderInfo }) {
  const formatedDate = new Date(orderInfo.saleDate).toLocaleDateString('pt-BR');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/customer/orders/${orderInfo.id}`);
  };

  return (
    <button
      type="button"
      onClick={ handleClick }
    >
      {console.log(orderInfo)}
      <h5 data-testid={ `customer_orders__element-order-id-${orderInfo.id}` }>
        Pedido
        <p>{orderInfo.id}</p>
      </h5>
      <p data-testid={ `customer_orders__element-delivery-status-${orderInfo.id}` }>
        {orderInfo.status}
      </p>
      <p data-testid={ `customer_orders__element-order-date-${orderInfo.id}` }>
        {formatedDate}
      </p>
      <p data-testid={ `customer_orders__element-card-price-${orderInfo.id}` }>
        {orderInfo.totalPrice.replace('.', ',') }
      </p>
    </button>
  );
}

OrdersCard.propTypes = {
  orderInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    saleDate: PropTypes.string.isRequired,
    totalPrice: PropTypes.string.isRequired,
  }).isRequired,
};
