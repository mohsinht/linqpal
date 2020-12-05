const db = global.db;

module.exports = () => {
  return async (req, res, next) => {
    //TODO: Add authentication
    next();
  };
};