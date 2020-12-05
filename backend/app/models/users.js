const { Sequelize, Model, DataTypes } = require('sequelize');

class User extends Model {
  static associate(models) {}
}

User.init(
  {
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
      field: 'address',
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
      attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
    },
    modelName: 'user',
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    sequelize: global.sequelize,
  }
);

module.exports = User;
