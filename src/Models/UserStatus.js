const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

  sequelize.define('UserStatus', {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, //inserta una nueva fila en la tabla y si no se especifica un valor para la columna id, Sequelize asigna automáticamente el siguiente valor disponible
      //tener en cuenta que si se eliminan los datos de la tabla este sigue contando teniendo en cuanta los eliminados 
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
  },
    { //equivalente PRIMARY KEY CLUSTERED 
      // indexes: [
      //   {
      //     name: 'PK_DocumentTypes_Id', // Nombre del índice
      //     unique: true, // Asegura que los valores sean únicos
      //     fields: ['Id'] // Campo que forma la clave primaria
      //   }
      // ],
      timestamps: true,
      createdAt: false,
      updatedAt: false,
    }
  )

};