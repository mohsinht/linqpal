import API from '../config/api';
import axios from 'axios';

export const login = async (
  username: string,
  password: string
): Promise<any> => {
  return await new Promise<boolean>(async (resolve, reject) => {
    try {
      const res = await axios({
        method: 'post',
        url: API.ADMIN.LOGIN,
        data: { username, password },
      })
      localStorage.setItem('admin_token', res.data.token);
      localStorage.setItem('admin_name', res.data.admin.username);
      localStorage.setItem('admin_email', res.data.admin.email);
      resolve(true);
    } catch (err) {
      resolve(false);
    }
  });
};

export const isLoggedIn = () : boolean => {
    const token = localStorage.getItem('admin_token');
    return token !== null;
}

export const logout = () : void => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_name');
    localStorage.removeItem('admin_email');
}