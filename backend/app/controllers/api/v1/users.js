const db = global.db;
const { Op } = require('sequelize');
const { encrypt, secret } = require('../../../lib/helper');

module.exports = (router) => {
  router.post('/register', async (req, res) => {
    try {
      const { firstName, lastName, telephone, ssn, address } = req.body;

      const user = await db.Users.create({
          firstName,
          lastName,
          telephone,
          ssn,
          address
      })

      res.json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ success: false, message: 'User Registration Failed' });
    }
  });

};
