import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function OrdersCard({ orderInfo, role }) {
  const formatedDate = new Date(orderInfo.saleDate).toLocaleDateString('pt-BR');
  const navigate = useNavigate();
  const testId = `${role}_orders__element-`;

  const handleClick = () => {
    console.log(role);
    navigate(`/${role}/orders/${orderInfo.id}`);
  };

  return (
    <button type="button" onClick={ handleClick }>
      <h5 data-testid={ `${testId}order-id-${orderInfo.id}` }>
        Pedido
        <p>{orderInfo.id}</p>
      </h5>
      <p data-testid={ `${testId}delivery-status-${orderInfo.id}` }>
        {orderInfo.status}
      </p>
      <p data-testid={ `${testId}order-date-${orderInfo.id}` }>{formatedDate}</p>
      <p data-testid={ `${testId}card-price-${orderInfo.id}` }>
        {orderInfo.totalPrice.replace('.', ',')}
      </p>
      {role === 'seller' && (
        <p data-testid={ `${testId}card-address-${orderInfo.id}` }>
          {orderInfo.deliveryAddress}
        </p>
      )}
    </button>
  );
}

OrdersCard.propTypes = {
  role: PropTypes.string.isRequired,
  orderInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    saleDate: PropTypes.string.isRequired,
    totalPrice: PropTypes.string.isRequired,
    deliveryAddress: PropTypes.string.isRequired,
  }).isRequired,
};
