require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const postgres = require('pg')

const {DB_USER, DB_PASSWORD, DB_HOST,DB_NAME} = process.env;


//Sequelize
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/users`, 
{
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  // dialectModule: postgres,
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// importo modelos

const {SecUsers,UserStatus,DocumentTypes} = sequelize.models;

//relaciones SecUsers - DocumentT

DocumentTypes.hasMany(SecUsers);

SecUsers.belongsTo(DocumentTypes); 

//relaciones SecUsers - UserStatus
UserStatus.hasMany(SecUsers);

SecUsers.belongsTo(UserStatus); 

//  {
//   through: 'UserStateId',
//   foreignKey: 'UserStateId',
//   targetKey: 'Id'
// }



module.exports = {
  ...sequelize.models, 
  conn: sequelize,     
};
