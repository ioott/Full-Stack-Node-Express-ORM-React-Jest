import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import myContext from '../context/myContext';

export default function ProductCard({ product }) {
  const { cart } = useContext(myContext);
  const [inputValue, setInputValue] = useState(0);
  const { id, name, price, urlImage } = product;

  // const handleCartItems = async () => {
  //   const obj = {
  //     ...product,
  //     quantidade: inputValue,
  //   };
  //   const check = cartItem.findIndex((item) => item.id === obj.id);
  //   const failCheck = -1;
  //   const newItems = cartItem.filter((item) => item.id !== obj.id);
  //   if (check !== failCheck) {
  //     const filter = [...newItems, obj].filter((item) => item.quantidade !== 0);
  //     setCartItem(filter);
  //   } else if (check === failCheck && obj.quantidade !== 0) {
  //     const filter = [...cartItem, obj].filter((item) => item.quantidade !== 0);
  //     setCartItem(filter);
  //   }
  // };

  // useEffect(() => {
  //   handleCartItems();
  // }, [inputValue]);

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
    if (value > 0) {
      setInputValue(value);
      // const newTotal = Number((value * price).toFixed(2));
      // setTotal(newTotal);
      // ! setCartTotal(newTotal);
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
  // setTotal: PropTypes.func.isRequired,
  // total: PropTypes.number.isRequired,
  // setCartItem: PropTypes.func.isRequired,
  // cartItem: PropTypes.arrayOf(PropTypes.shape({ a: 'a' })).isRequired,
};
