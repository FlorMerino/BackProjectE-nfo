const express = require('express');
const morgan = require('morgan');
const routes = require('./Routes/index')
const server = express();

//middle
server.use(express.urlencoded({ extended: true}));
server.use(express.json({ limit: '50mb' }))
server.use(morgan('dev'))


//

server.use('/api',routes)





module.exports = server;