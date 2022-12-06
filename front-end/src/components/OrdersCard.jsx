import React from 'react';

export default function OrdersCard() {
  return (
    <div>
      <p data-testid={ `customer_orders__element-order-id-${id}` }>
        Número do Pedido
      </p>
      <p>
        Status do Pedido
      </p>
      <p>
        Data
      </p>
      <p>
        Valor
      </p>
    </div>
  );
}
