import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import myContext from '../context/myContext';

import ProductCard from './ProductCard';

export default function Products() {
  const { cart } = useContext(myContext);
  const [products, setProducts] = useState([]);
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
    navigate('/customer/checkout');
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main style={ { display: 'flex', flexWrap: 'wrap' } }>
      { products?.map((product) => (
        <ProductCard
          key={ product.id }
          product={ product }
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
