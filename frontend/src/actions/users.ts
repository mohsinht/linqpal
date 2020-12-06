import API from '../config/api';
import axios from 'axios';

export const register = async (
  firstName: string,
  lastName: string,
  telephone: string,
  address: string,
  ssn: string
): Promise<any> => {
  return await new Promise<boolean>(async (resolve, reject) => {
    try {
      const res = await axios({
        method: 'post',
        url: API.USER.REGISTER,
        data: { firstName, lastName, telephone, address, ssn },
      })
      resolve(true);
    } catch (err) {
      resolve(false);
    }
  });
};
