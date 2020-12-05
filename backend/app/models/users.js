const { Sequelize, Model, DataTypes } = require('sequelize');
const crypto = require('crypto');
const { secret, iv } = require('../lib/helper');

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
      field: 'ssn',
      get: function () {
        try {
          const decipher = crypto.createDecipheriv('aes-256-gcm', secret, iv, {
            authTagLength: 16,
          });
          return decipher.update(
            this.getDataValue('ssn').toString(),
            'base64',
            'utf8'
          );
        } catch (e) {
          console.log(e);
          return this.getDataValue('ssn');
        }
      },
      set: function (value) {
        const cipher = crypto.createCipheriv('aes-256-gcm', secret, iv, {
          authTagLength: 16,
        });
        return this.setDataValue(
          'ssn',
          cipher.update(value, 'utf8', 'base64') + cipher.final('base64')
        );
      },
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
