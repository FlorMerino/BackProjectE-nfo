const server = require('./src/app.js')
const { conn } = require('./src/db.js');

const port= 3001;


conn.sync({ force: false }).then(() => {
  server.listen(port, () => {
    console.log('%s listening at',port); 
  });
});
