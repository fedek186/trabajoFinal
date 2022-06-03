module.exports = function (sequelize, dataTypes) {
    
    /* Alias que le asigne */
    let alias = "Producto";

    /* Configuraciones de las columnas de la tabla */
    let cols = {
        idProductos:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        foto:{
            type: dataTypes.STRING,
        },
        nombre:{
            type: dataTypes.STRING,
        },
        descripcion:{
            type: dataTypes.STRING,
        },
        fecha:{
            type: dataTypes.DATE,
        },
        idUsuario:{
            type: dataTypes.INTEGER,
        },
        createdAt:{
            type: dataTypes.TIMESTAMP,
        },
        updatedAt: {
            type: dataTypes.TIMESTAMP,
        }
    }

    let config = {
        tableName: 'Producto', 
        timestamps: true, //Si la tabla no tiene los campos created_at y updated_at
        underscored: false, //Si los nombres de las columnas en la db tienen guiones bajos en lugar de camelCase.
    }

    const Producto = sequelize.define(alias, cols, config);

    return Producto;
}