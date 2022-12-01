import React, { useContext } from 'react';
import myContext from '../context/myContext';

// import useLocalStorage from '../hooks/useLocalStorage';

const dataId = 'customer_checkout__element-order-table-';

export default function CheckoutTable() {
  const { cart } = useContext(myContext);
  // const [cart, setCart] = useState([]);
  // const [totalValue, setTotalValue] = useState(0);

  // useEffect(() => {
  // const cartItens = JSON.parse(localStorage.getItem('cartItens'));
  // const cartValue = localStorage.getItem('cartTotal');
  // setCart(cartItens);
  // setTotalValue(cartValue);
  // }, []);

  const handleClick = (item) => {
    cart.deleteItem(item);
  };

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
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          { cart?.items.map((item, index) => (
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
              <td data-testid={ `${dataId}remove-${index}` }>
                <button
                  type="button"
                  onClick={ () => handleClick(item) }
                >
                  Remover
                </button>
              </td>
            </tr>
          )) }
        </tbody>
        <tfoot>
          <tr>
            <td data-testid="customer_checkout__element-order-total-price">
              { Number(cart.total).toFixed(2).replace('.', ',') }
            </td>
          </tr>
        </tfoot>
      </table>
    </main>
  );
}
