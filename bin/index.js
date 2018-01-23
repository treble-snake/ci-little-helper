const http = require('http');
const app = require('../src/index');

// create HTTP ans WS servers
const server = http.createServer(app);
server.listen(process.env.port || 5025,
  () => console.log('HTTP Server is listening on %d', server.address().port));