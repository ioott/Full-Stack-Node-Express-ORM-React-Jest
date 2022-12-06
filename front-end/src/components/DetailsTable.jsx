import React from 'react';
import PropTypes from 'prop-types';

const dataId = 'customer_order_details__element-order-details-';

export default function DetailsTable({ orderInfo }) {
  return (
    <main>
      <h1>Detalhes do Pedido</h1>
      <h2 dataId={ `${dataId}label-order-id` }>{`Pedido ${orderInfo.id}`}</h2>
      <h2 dataId={ `${dataId}label-seller-name` }>{`Pedido ${orderInfo.id}`}</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          { orderInfo?.products.length > 0 && orderInfo.products.map((item, index) => (
            <tr key={ item.id }>
              <td data-testid={ `${dataId}item-number-${index}` }>{ index + 1 }</td>
              <td data-testid={ `${dataId}name-${index}` }>{ item.name }</td>
              <td data-testid={ `${dataId}quantity-${index}` }>{ item.quantity }</td>
              <td data-testid={ `${dataId}unit-price-${index}` }>
                { (+item.price).toFixed(2).replace('.', ',') }
              </td>
              <td data-testid={ `${dataId}sub-total-${index}` }>
                { (+item.price * item.quantity).toFixed(2).replace('.', ',') }
              </td>
            </tr>
          )) }
        </tbody>
        <tfoot>
          <tr>
            <td data-testid="customer_order_details__element-order-total-price">
              { orderInfo.totalPrice }
            </td>
          </tr>
        </tfoot>
      </table>
    </main>
  );
}

DetailsTable.propTypes = {
  orderInfo: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    sellerId: PropTypes.number,
    totalPrice: PropTypes.string,
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.string,
    saleDate: PropTypes.string,
    status: PropTypes.string,
    products: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      price: PropTypes.string,
      urlImage: PropTypes.string,
    })),
  }).isRequired,
};
