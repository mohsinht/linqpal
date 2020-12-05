const Sequelize = require('sequelize');
const databaseConfig = require('../../config/database.js');
const fs = require('fs');
const path = require('path');
const app = require('../../index');
const db = {};
const sequelize = new Sequelize(databaseConfig[app.settings.env]);
global.sequelize = sequelize;
if (!databaseConfig[app.settings.env]) {
  throw new Error(`Database configuration object for missing for environment ${app.settings.env}`);
}

sequelize.authenticate().then(function () {
  global.log.info('Database connection has been established successfully.');
})
fs.readdirSync(__dirname).filter(file => {
  return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js');
}).forEach(file => {
  const modelName = file.charAt(0).toUpperCase() +
    file.slice(1).replace(/_(.)/g, function (match, char) {
      return char.toUpperCase();
    });
  db[modelName.split('.')[0]] = require('./'+file);
});

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
