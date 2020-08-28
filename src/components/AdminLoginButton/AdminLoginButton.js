import React from 'react';

import './AdminLoginButton.css';

const login = () => console.log('to admin login page')

const AdminLoginButton = () => {
  return (
    <div className='loginButton'>
      <a href='#' onClick={ login }>Admin Login</a>
    </div>
  );
};

export default AdminLoginButton;
