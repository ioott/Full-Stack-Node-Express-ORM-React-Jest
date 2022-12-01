import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import myContext from '../context/myContext';

import ProductCard from './ProductCard';

export default function Products() {
  const { cart } = useContext(myContext);
  const [products, setProducts] = useState([]);
  // const [total, setTotal] = useState(0);
  // const [cartItem, setCartItem] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const api = axios.create({
      baseURL: 'http://localhost:3001/',
    });
    const { data } = await api
      .get('customer/products');
    setProducts(data);
  };

  const handleClick = () => {
    // localStorage.setItem('cartItens', JSON.stringify(cartItem));
    // setCart(cartItem);
    navigate('/customer/checkout');
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem('cartValue', cartTotal.toFixed(2).replace('.', ','));
  // }, [cartTotal]);

  return (
    <main style={ { display: 'flex', 'flex-wrap': 'wrap' } }>
      { products?.map((product) => (
        <ProductCard
          key={ product.id }
          product={ product }
          // setTotal={ setTotal }
          // setCart={ setCart }
          // cartItem={ cartItem }
          // total={ total }
        />
      )) }
      <button
        type="button"
        onClick={ handleClick }
        data-testid="customer_products__button-cart"
        disabled={ cart.total < 1 }
        style={ { position: 'fixed' } }
      >
        <p data-testid="customer_products__checkout-bottom-value">
          { Number(cart.total).toFixed(2).replace('.', ',') }
        </p>
      </button>
    </main>
  );
}
