import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import myContext from '../context/myContext';

export default function ProductCard({ product }) {
  const { cart } = useContext(myContext);
  const [inputValue, setInputValue] = useState(0);
  const { id, name, price, urlImage } = product;

  useEffect(() => {
    cart.handleCart(product, Number(inputValue));
  }, [inputValue]);

  const handleAdd = () => {
    if (inputValue >= 0) {
      setInputValue(+inputValue + 1);
    }
  };

  const handleSub = () => {
    if (inputValue > 0) {
      setInputValue(+inputValue - 1);
    }
  };

  const handleChange = (e) => {
    const qty = e.target.value;
    if (qty >= 0) {
      setInputValue(qty);
    } else {
      setInputValue(0);
    }
  };

  return (
    <div>
      <p data-testid={ `customer_products__element-card-price-${id}` }>
        {price.replace('.', ',')}
      </p>
      <img
        width="10%"
        src={ urlImage }
        alt={ `Imagem do produto ${name}` }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <p data-testid={ `customer_products__element-card-title-${id}` }>{ name }</p>
      <button
        type="button"
        onClick={ handleSub }
        data-testid={ `customer_products__button-card-rm-item-${id}` }
      >
        -
      </button>
      <input
        type="number"
        value={ inputValue }
        onChange={ handleChange }
        data-testid={ `customer_products__input-card-quantity-${id}` }
      />
      <button
        type="button"
        onClick={ handleAdd }
        data-testid={ `customer_products__button-card-add-item-${id}` }
      >
        +
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    urlImage: PropTypes.string,
  }).isRequired,
};
