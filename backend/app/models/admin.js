const { Sequelize, Model, DataTypes } = require('sequelize');

class Admin extends Model {
  static associate(models) {}
}

Admin.init(
  {
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
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'],
      },
    },
    modelName: 'admin',
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    sequelize: global.sequelize,
  }
);

module.exports = Admin;
