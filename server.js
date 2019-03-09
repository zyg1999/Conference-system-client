var express = require('express');
var static = require('express-static');

var server = express();
server.use(static('./'));

server.listen(8878);