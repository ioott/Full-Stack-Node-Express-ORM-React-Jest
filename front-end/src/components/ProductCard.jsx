import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import myContext from '../context/myContext';

export default function ProductCard({ product }) {
  const { cart } = useContext(myContext);
  const [inputValue, setInputValue] = useState(0);
  const { id, name, price, urlImage } = product;

  const handleAdd = () => {
    setInputValue((current) => {
      const newQty = +current + 1;
      cart.addItem(price);
      cart.handleCart(product, newQty);
      return newQty;
    });
  };

  const handleSub = () => {
    if (inputValue > 0) {
      setInputValue((current) => {
        const newQty = +current - 1;
        cart.rmItem(price);
        cart.handleCart(product, newQty);
        return newQty;
      });
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    if (value >= 0) {
      setInputValue(value);
      cart.handleCart(product, value);
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
