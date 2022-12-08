import axios from 'axios';
import React, { useEffect, useState } from 'react';

function UserTable() {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/users/', {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => setUsers(response.data))
      .catch((e) => console.log(e));
  }, [token]);

  const handleClick = (id) => {
    axios.delete(`http://localhost:3001/users/${id}`, {
      headers: {
        Authorization: token,
      },
    })
      .then(() => {
        setUsers((curr) => (
          curr.filter((user) => user.id !== id)
        ));
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          { users.length > 0 && users.map((user, index) => (
            <tr key={ user.id }>
              <td
                data-testid={
                  `admin_manage__element-user-table-item-number-${index + 1}`
                }
              >
                { index + 1 }
              </td>
              <td
                data-testid={ `admin_manage__element-user-table-name-${index + 1}` }
              >
                { user.name }
              </td>
              <td
                data-testid={ `admin_manage__element-user-table-email-${index + 1}` }
              >
                { user.email }
              </td>
              <td data-testid={ `admin_manage__element-user-table-role-${index + 1}` }>
                { user.role }
              </td>
              <td>
                <button
                  data-testid={ `admin_manage__element-user-table-remove-${index + 1}` }
                  type="button"
                  onClick={ () => handleClick(user.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
