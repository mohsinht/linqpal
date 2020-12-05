const promise = require('bluebird');
const jwtVerify = promise.promisify(require('jsonwebtoken').verify);
const db = global.db;
const { secret } = require('./helper');

const authError = { success: false, message: 'Invalid Token' };

module.exports = () => {
  return async (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(400).send({ message: 'Authorization header missing' });
    }
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = await jwtVerify(token, secret);
      if (!decoded) {
        return res.status(401).send(authError);
      }
      const admin = await db.Admin.findOne({
        where: {
          id: decoded.id,
        },
      });
      if (!admin) {
        return res.status(401).send(authError);
      }
      req.admin = admin;
    } catch (error) {
      global.log.error(error);
      return res.status(401).send(authError);
    }
    next();
  };
};
