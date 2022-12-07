import React from 'react';
import PropTypes from 'prop-types';

const dataId = 'customer_order_details__element-order-details-';
const tableId = 'customer_order_details__element-order-table-';

export default function DetailsTable({ orderInfo }) {
  const formatedDate = new Date(orderInfo.saleDate).toLocaleDateString('pt-BR');

  return (
    <div>
      <h1>Detalhes do Pedido</h1>
      <p data-testid={ `${dataId}label-order-id` }>{`Pedido ${orderInfo.id}`}</p>
      <p data-testid={ `${dataId}label-seller-name` }>{`${orderInfo.seller.name}`}</p>
      <p data-testid={ `${dataId}label-order-date` }>{`${formatedDate}`}</p>
      <p data-testid={ `${dataId}label-delivery-status` }>{`${orderInfo.status}`}</p>
      <button
        disabled
        type="button"
        data-testid="customer_order_details__button-delivery-check"
      >
        Marcar Como Entregue
      </button>
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
              <td data-testid={ `${tableId}item-number-${index}` }>{ index + 1 }</td>
              <td data-testid={ `${tableId}name-${index}` }>{ item.name }</td>
              <td data-testid={ `${tableId}quantity-${index}` }>{ item.quantity }</td>
              <td data-testid={ `${tableId}unit-price-${index}` }>
                { (+item.price).toFixed(2).replace('.', ',') }
              </td>
              <td data-testid={ `${tableId}sub-total-${index}` }>
                { (+item.price * item.quantity).toFixed(2).replace('.', ',') }
              </td>
            </tr>
          )) }
        </tbody>
        <tfoot>
          <tr>
            <td data-testid="customer_order_details__element-order-total-price">
              { orderInfo.totalPrice.replace('.', ',') }
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
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
    seller: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
