'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    return queryInterface.createTable('user', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        field: 'first_name',
      },
      lastName: {
        type: DataTypes.STRING,
        field: 'last_name',
      },
      telephone: {
        type: DataTypes.STRING,
        field: 'telephone',
      },
      address: {
        type: DataTypes.TEXT,
        field: 'address',
      },
      ssn: {
        type: DataTypes.TEXT,
        field: 'ssn',
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: 'deleted_at',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user');
  },
};
