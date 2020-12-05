const db = global.db;
const { Op } = require('sequelize');
const constants = require('../../../lib/constants');
const { encrypt, secret } = require('../../../lib/helper');
const jwt = require('jsonwebtoken');
const promise = require('bluebird');
const jwtVerify = promise.promisify(require('jsonwebtoken').verify);

module.exports = (router) => {
  router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const admin = await db.Admin.findOne({
        where: {
          [Op.and]: [
            {
              [Op.or]: [{ email: username }, { username: username }],
            },
            {
              password: encrypt(password),
            },
          ],
        },
      });
      if (!admin) {
        return res
          .status(404)
          .json({ success: false, message: 'Admin not found' });
      }
      const token = jwt.sign(admin.get({ plain: true }), secret);

      res.json({ success: true, admin, token });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ success: false, message: 'Login failed' });
    }
  });

  router.get('/', async (req, res) => {
    res.json({ success: true, admin: req.admin });
  });

  router.get('/users', async (req, res) => {
    const users = await db.Users.findAll();

    res.json({ success: true, users });
  });
};
