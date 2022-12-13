import React, { useState } from 'react';
import RegisterForm from './RegisterForm';
import UserTable from './UserTable';

function Manage() {
  const [refresh, setRefresh] = useState(true);

  return (
    <div>
      <RegisterForm setRefresh={ setRefresh } />
      <UserTable refresh={ refresh } setRefresh={ setRefresh } />
    </div>
  );
}

export default Manage;
