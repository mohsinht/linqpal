import React from 'react';
import { logout } from '../actions/admin';

export const LogInContext = React.createContext({
  loginStatus: localStorage.getItem('admin_token') !== null,
  login: function () {},
  logout,
});
