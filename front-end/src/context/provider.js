import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Context from './myContext';
import useLocalStorage from '../hooks/useLocalStorage';
import Cart from './utils/Cart';

function Provider({ children }) {
  const cartItems = useLocalStorage('cartItens', []);
  const cartTotal = useLocalStorage('cartTotal', 0);

  const contextValue = useMemo(() => {
    const cart = new Cart(cartItems, cartTotal);

    return {
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
