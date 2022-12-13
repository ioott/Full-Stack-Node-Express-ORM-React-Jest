import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function RegisterForm({ setRefresh }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [dropdown, setDropdown] = useState('customer');
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const adminTestId = 'admin_manage__';
  const commonTestId = 'common_register__';

  useEffect(() => {
    setError(false);
    const ELEVEN = 11;
    const nameValidation = name.length > ELEVEN;
    const regex = /\S+@\S+\.\S+/;
    const emailValidation = regex.test(email);
    const MIN_LENGTH = 5;
    const passwordValidation = password.length > MIN_LENGTH;
    const validate = emailValidation && passwordValidation && nameValidation;
    setDisabled(!validate);
  }, [email, password, name]);

  const handleClick = async () => {
    try {
      const api = axios.create({
        baseURL: 'http://localhost:3001/',
      });
      const { data } = await api
        .post('register', { name, email, password, role: dropdown }, {
          headers: {
            Authorization: user.token,
          },
        });
      if (user?.role === 'administrator') {
        setEmail('');
        setName('');
        setPassword('');
        setDropdown('customer');
        setDisabled(true);
        setError(false);
        setRefresh(true);
      } else {
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/customer/products');
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div>
      <form>
        <label htmlFor="name">
          Nome
          <input
            data-testid={ `${user?.role === 'administrator'
              ? adminTestId : commonTestId}input-name` }
            id="name"
            type="text"
            placeholder="João da Silva"
            value={ name }
            onChange={ (e) => setName(e.target.value) }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            data-testid={ `${user?.role === 'administrator'
              ? adminTestId : commonTestId}input-email` }
            id="email"
            type="email"
            placeholder="email@trybeer.com"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            data-testid={ `${user?.role === 'administrator'
              ? adminTestId : commonTestId}input-password` }
            id="password"
            type="password"
            placeholder="**********"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
        { user?.role === 'administrator' && (
          <select
            id="seller_dropdown"
            data-testid="admin_manage__select-role"
            value={ dropdown }
            onChange={ (e) => setDropdown(e.target.value) }
          >
            { ['customer', 'administrator', 'seller'].map((item, index) => (
              <option key={ index } value={ item }>{item}</option>
            )) }
          </select>
        )}
        <button
          data-testid={ `${user?.role === 'administrator'
            ? adminTestId : commonTestId}button-register` }
          type="button"
          disabled={ disabled }
          onClick={ handleClick }
        >
          CADASTRAR
        </button>
        { error
        && (
          <p
            data-testid={ `${user?.role === 'administrator'
              ? adminTestId : commonTestId}element-invalid${user?.role === 'administrator'
              ? '-' : '_'}register` } // essa maluquice é culpa da trybe
          >
            Usuário ja existente
          </p>
        ) }
      </form>
    </div>
  );
}

RegisterForm.propTypes = {
  setRefresh: PropTypes.func.isRequired,
};
