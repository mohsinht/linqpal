# linqpal-be
Backend for Linqpal Test Service

I'm using KrakenJS for initial server setup.

Steps to start the server:
- Make sure you have `sequelize` and `mysql2` installed.
- Update `backend/config/database.sample.js` with the correct details and copy the content to `backend/config/database.js`
- `npm install`
- `npm run migrate` to migrate the tables in the database
- `npm run seed` to create a new admin

Default Admin:
username: 'admin', password: '123123'
You can also login with admin email: 'admin@linqpal.com'
