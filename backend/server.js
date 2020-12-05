'use strict';

const app = require('./index');
const http = require('http');
const server = http.Server(app);
server.listen(process.env.PORT || 8000);

server.on('listening', function () {
  global.log.info(
    'Server listening on http://localhost:%d',
    this.address().port
  );
});