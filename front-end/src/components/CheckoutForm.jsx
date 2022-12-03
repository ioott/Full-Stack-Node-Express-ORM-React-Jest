import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import myContext from '../context/myContext';

const dataId = 'customer_checkout__';

export default function CheckoutForm() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const { cart } = useContext(myContext);
  const [sellers, setSellers] = useState([]);
  const [dropdown, setDropdown] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/seller')
      .then((response) => {
        setSellers(response.data);
        setDropdown(response.data[0].id);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDropdown = (value) => {
    setDropdown(value);
  };

  const handleAddress = (value) => {
    setAddress(value);
  };

  const handleNumber = (value) => {
    setNumber(value);
  };

  const handleCheckout = () => {
    const products = cart.items;
    const totalPrice = cart.total;
    const order = {
      userId: user.id,
      sellerId: dropdown,
      products,
      totalPrice,
      deliveryAddress: address,
      deliveryNumber: number,
    };

    axios.post('http://localhost:3001/customer/checkout', order, {
      headers: {
        Authorization: user.token,
      } })
      .then((response) => navigate(`/customer/orders/${response.data}`))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form>
      <label htmlFor="seller_dropdown">
        P. Vendedora Responsável
        <select
          id="seller_dropdown"
          data-testid={ `${dataId}select-seller` }
          value={ dropdown }
          onChange={ (e) => handleDropdown(e.target.value) }
        >
          { sellers.map((item, index) => (
            <option key={ index } value={ item.id }>{item.name}</option>
          )) }
        </select>
      </label>
      <label htmlFor="address">
        Endereço
        <input
          type="text"
          id="address"
          value={ address }
          onChange={ (e) => handleAddress(e.target.value) }
          data-testid={ `${dataId}input-address` }
        />
      </label>
      <label htmlFor="address_number">
        Número
        <input
          type="number"
          id="address_number"
          data-testid={ `${dataId}input-address-number` }
          value={ number }
          onChange={ (e) => handleNumber(e.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid={ `${dataId}button-submit-order` }
        onClick={ handleCheckout }
      >
        FINALIZAR PEDIDO
      </button>
    </form>
  );
}
