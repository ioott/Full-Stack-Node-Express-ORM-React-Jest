import React, { useEffect } from 'react';
import axios from 'axios';

const dataId = 'customer_order_details__element-order-table-';

export default function CheckoutTable() {
  useEffect(() => {
    axios.get('http://localhost:3001/seller')
      .then((response) => {
        setSellers(response.data);
        setDropdown(response.data[0].id);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <main>
      <h1>Finalizar Pedido</h1>
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
          { cart.items.length > 0 && cart.items.map((item, index) => (
            <tr key={ item.id }>
              <td data-testid={ `${dataId}item-number-${index}` }>{ index + 1 }</td>
              <td data-testid={ `${dataId}name-${index}` }>{ item.name }</td>
              <td data-testid={ `${dataId}quantity-${index}` }>{ item.quantidade }</td>
              <td data-testid={ `${dataId}unit-price-${index}` }>
                { (+item.price).toFixed(2).replace('.', ',') }
              </td>
              <td data-testid={ `${dataId}sub-total-${index}` }>
                { (+item.price * item.quantidade).toFixed(2).replace('.', ',') }
              </td>
            </tr>
          )) }
        </tbody>
        <tfoot>
          <tr>
            <td data-testid="customer_order_details__element-order-total-price">
              { Number(cart.total).toFixed(2).replace('.', ',') }
            </td>
          </tr>
        </tfoot>
      </table>
    </main>
  );
}
