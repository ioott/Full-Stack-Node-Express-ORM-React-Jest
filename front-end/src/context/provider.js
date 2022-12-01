import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Context from './myContext';
import useLocalStorage from '../hooks/useLocalStorage';
import Cart from './utils/Cart';

function Provider({ children }) {
  const cartItems = useLocalStorage('cartItens', []);
  const cartTotal = useLocalStorage('cartTotal', 0);

  // const newCartItem = (product) => {
  //   const updatedCart = [...cart, product];
  //   setCart(updatedCart);
  // };

  // const updateCartItem = (product) => {
  //   const updatedCart = cart.map((item) => {
  //     if (item.id === product.id) {
  //       return product;
  //     }
  //     return item;
  //   });
  //   setCart(updatedCart);
  // };

  // const removeCartItem = (product) => {
  //   const updatedCart = cart.filter((item) => item.id !== product.id);
  //   setCart(updatedCart);
  // };

  // const handleCartItems = (product, inputValue) => {
  //   const obj = {
  //     ...product,
  //     quantidade: inputValue,
  //   };
  //   const exists = cart.find((item) => item.id === obj.id);
  //   if (!exists) {
  //     newCartItem(obj);
  //   } else if (!!exists && obj.quantidade > 0) {
  //     updateCartItem(obj);
  //   } else {
  //     removeCartItem(obj);
  //   }
  // };

  // const addItem = (price) => {
  //   const sum = Number(cartTotal) + Number(price);
  //   const value = Number(sum.toFixed(2));
  //   setCartTotal(value);
  // };

  // const rmItem = (price) => {
  //   const sub = Number(cartTotal) - Number(price);
  //   const value = Number(sub.toFixed(2));
  //   setCartTotal(value);
  // };

  const contextValue = useMemo(() => {
    const cart = new Cart(cartItems, cartTotal);

    return {
      // addItem,
      // rmItem,
      // cartTotal,
      // setCartTotal,
      // handleCartItems,
      // setCart,
      cart,
    };
  }, [cartItems, cartTotal]);

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
