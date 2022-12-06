import React from 'react';
import PropTypes from 'prop-types';

export default function OrdersCard({ orderInfo }) {
  return (
    <div>
      {console.log(orderInfo)}
      <h5 data-testid={ `customer_orders__element-order-id-${orderInfo.id}` }>
        Pedido
        <p>{orderInfo.id}</p>
      </h5>
      <p data-testid={ `customer_orders__element-delivery-status-${orderInfo.id}` }>
        {orderInfo.status}
      </p>
      <p data-testid={ `customer_orders__element-order-date-${orderInfo.id}` }>
        {orderInfo.saleDate}
      </p>
      <p data-testid={ `customer_orders__element-card-price-${orderInfo.id}` }>
        {orderInfo.totalPrice}
      </p>
    </div>
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
