const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const routes = require('./Routes/index')
const server = express();
server.name = 'API';
//middle
server.use(express.urlencoded({ extended: true,  limit: '50mb'}));
server.use(express.json({ limit: '50mb' }))
server.use(cookieParser())
server.use(morgan('dev'))


//

server.use('/',routes)


module.exports = server;