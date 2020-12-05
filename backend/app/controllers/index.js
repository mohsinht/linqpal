var path = require('path');
const fs = require('fs');

module.exports = function (router) {
  router.get('/', function (req, res) {
    res.send('Backend for Linqpal for encryption');
  });
};
