'use strict';
const {encrypt} = require('../app/lib/helper');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('admin', [
      {
        first_name: "Admin",
        last_name: "",
        username: "admin",
        email: "admin@linqpal.com",
        password: encrypt("123123"),
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('admin', null, {});
  },
};
