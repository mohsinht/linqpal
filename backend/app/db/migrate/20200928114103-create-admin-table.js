'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    return queryInterface.createTable('admin', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        //Optional
        type: DataTypes.STRING,
        field: 'first_name',
        allowNull: true,
      },
      lastName: {
        //Optional
        type: DataTypes.STRING,
        field: 'last_name',
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        field: 'email',
      },
      username: {
        type: DataTypes.STRING,
        field: 'username',
      },
      password: {
        type: DataTypes.STRING,
        field: 'password',
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
    return queryInterface.dropTable('admin');
  },
};
