import API from '../config/api';
import axios from 'axios';
import IUser from '../interfaces/IUser';

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

export const fetchUsers = async () : Promise<IUser[]> => {
    return await new Promise<IUser[]>(async (resolve, reject) => {
      try {
        const res = await axios({
          method: 'get',
          url: API.ADMIN.USERS,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
          }
        })
        console.log(res.data);
        resolve(res.data.users);
      } catch (err) {
        resolve([]);
      }
    });
}

export const isLoggedIn = () : boolean => {
    const token = localStorage.getItem('admin_token');
    return token !== null;
}

export const logout = () : void => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_name');
    localStorage.removeItem('admin_email');
}