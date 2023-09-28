const {DataTypes, Sequelize} = require('sequelize');


module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('SecUsers', {
    Id:{
        type: DataTypes.UUID, //uniqueidentifier  
        // defaultValue: Sequelize.literal('uuid_generate_v4()') ,//equivalente a la funcion newid()
        // defaultValue: DataTypes.UUIDV4, 
        // primaryKey: true, 
        unique: true, 
        allowNull: false,
      },
      UserLogin:{
        type: DataTypes.STRING(100),//traduce a varchar en postgreSQL
        allowNull: false,
      },
      FirstName: {       
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      LastName:{
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      DocumentTypeId:{
        type: DataTypes.INTEGER,
        allowNull: true,
      },
	  DocumentNumber:{
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Address:{
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      PostalCode:{
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      PhoneNumbers:{
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
      Email: {
        type: DataTypes.STRING(1000),
        allowNull: true
      },
      PasswordHash:{
        type: DataTypes.STRING,
        allowNull: true
      },
      PasswordSalt: {
        type: DataTypes.STRING,
        allowNull: true
      },
      MustChangePassword: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        // defaultValue:0,
      },
      FailedAccessAttempts: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      TokenId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      TwoFactorEnabled:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        // defaultValue:0,
      },
      DateOfBirth:{
        type: DataTypes.DATEONLY,
        allowNull:true
      },
      UserStateId:{
        type: DataTypes.INTEGER,
        allowNull:true
      },
      DeletedDate:{
        type: DataTypes.DATEONLY,
        allowNull:true
      },
      LastAccessDate:{
        type: DataTypes.DATEONLY,
        allowNull:true
      },

      ////////////////////
      CreatedDate: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('NOW()') //función GETDATE() equivale a 'NOW()' Cuando se inserta una nueva fila en la tabla SecUsers y no se proporciona un valor para la columna CreatedDate, se utilizará la fecha y hora actuales generadas por NOW()
      },
      ModifiedDate: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('NOW()') 
      },
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
      
    }
    );
  };