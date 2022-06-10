module.exports = function (sequelize, dataTypes) {
    
    /* Alias que le asigne */
    let alias = "Comentario";

    /* Configuraciones de las columnas de la tabla */
    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        comentario:{
            type: dataTypes.STRING,
        },
        id_usuario:{
            type: dataTypes.INTEGER,
        },
        id_producto:{
            type: dataTypes.INTEGER,
        },
        fecha:{
            type: dataTypes.DATE,
        }

    }

    let config = {
        tableName: 'comentarios', 
        timestamps: true, //Si la tabla no tiene los campos created_at y updated_at
        underscored: true, //Si los nombres de las columnas en la db tienen guiones bajos en lugar de camelCase.
    }

    const Comentario = sequelize.define(alias, cols, config);

    return Comentario;
}