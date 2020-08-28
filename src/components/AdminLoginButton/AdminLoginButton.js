import React from 'react';

import './AdminLoginButton.css';

const login = () => console.log('to admin login page')

const AdminLoginButton = () => {
  return (
    <div className='AdminLoginButton'>
      <a href='#' onClick={ login }>Admin Login</a>
    </div>
  );
};

export default AdminLoginButton;
