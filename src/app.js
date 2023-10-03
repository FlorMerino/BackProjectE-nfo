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
server.use((req, res, next) => {
  
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });


//

server.use('/',routes)


module.exports = server;