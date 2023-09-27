const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

    sequelize.define('DocumentTypes', {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true, //inserta una nueva fila en la tabla si no se especifica un valor para la columna id, Sequelize asigna automáticamente el siguiente valor disponible
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        IsActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    },
        {
            //equivalente PRIMARY KEY CLUSTERED 
            indexes: [
                {
                    name: 'PK_DocumentTypes_Id', // Nombre del índice
                    unique: true, // Asegura que los valores sean únicos
                    fields: ['Id'] // Campo que forma la clave primaria
                }
            ],
            timestamps: false,
            createdAt: false,
            updatedAt: false,
        }
    )
};