const server = require('./src/app.js')

const port= 3001;


server.listen(port, () => {
    console.log('listening at',port); // eslint-disable-line no-console
  })