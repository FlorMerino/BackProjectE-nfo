const {DataTypes, Sequelize} = require('sequelize');


module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('SecUsers', {
    Id:{
        type: DataTypes.UUID, //uniqueidentifier  
       // defaultValue: Sequelize.literal('uuid_generate_v4()') ,//equivalente a la funcion newid()
        defaultValue: DataTypes.UUIDV4, 
       primaryKey: true, 
        unique: true, 
        allowNull: false,
      },
      userLogin:{
        type: DataTypes.STRING(100),//traduce a varchar en postgreSQL
        allowNull: false,
      },
      firstName: {       
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      lastName:{
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    
	  documentNumber:{
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      address:{
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      postalCode:{
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      phoneNumbers:{
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(1000),
        allowNull: true
      },
      passwordHash:{
        type: DataTypes.STRING,
        allowNull: true
      },
      passwordSalt: {
        type: DataTypes.STRING,
        allowNull: true
      },
      mustChangePassword: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:false,// 0
      },
      failedAccessAttempts: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      tokenId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      twoFactorEnabled:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:false, //0
      },
      dateOfBirth:{
        type: DataTypes.DATEONLY,
        allowNull:true
      },
      deletedDate:{ 
        type: DataTypes.DATEONLY,
        allowNull:true
      },
      lastAccessDate:{ //?
        type: DataTypes.DATEONLY,
        allowNull:true
      },

      //////////////////// se genera de forma automatica con prop createdAt y updatedAt
      // CreatedDate: {
      //   type: DataTypes.DATE,
      //   defaultValue: Sequelize.literal('NOW()') //función GETDATE() equivale a 'NOW()' Cuando se inserta una nueva fila en la tabla SecUsers y no se proporciona un valor para la columna CreatedDate, se utilizará la fecha y hora actuales generadas por NOW()
      // },
      // ModifiedDate: {
      //   type: DataTypes.DATE,
      //   defaultValue: Sequelize.literal('NOW()') 
      // },
    },
    {  //equivalente PRIMARY KEY CLUSTERED 
      indexes: [
          {
              name: 'PK_DocumentTypes_Id', // Nombre del índice
              unique: true, // Asegura que los valores sean únicos
              fields: ['Id'] // Campo que forma la clave primaria
          }
      ],
      timestamps: true, //activa o desactiva q se generen las fechas de abajo
      createdAt: true, //guarda de forma automatica la fecha en que se creo el user
      updatedAt: true, // guarda tiempo de la última actualización
      paranoid:true, // Habilita el modo "paranoid", elimina de forma temporal
      deletedAt: 'deletedDate' 
      
    }
    );
  };