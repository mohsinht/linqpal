const SERVER = 'http://localhost:8000/api/v1';

const API = {
    ADMIN: {
        LOGIN: `${SERVER}/admin/login`,
        USERS: `${SERVER}/admin/users`,
    },
    USER: {
        REGISTER: `${SERVER}/users/register`,
    }
};

export default API;