module.exports = function (sequelize, dataTypes) {
    
    /* Alias que le asigne */
    let alias = "Seguidor";

    /* Configuraciones de las columnas de la tabla */
    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        id_seguidor: {
            type: dataTypes.INTEGER,
        },
        id_seguido: {
            type: dataTypes.INTEGER,
        }
    }

    let config = {
        tableName: 'seguidor_seguidos', 
        timestamps: true, //Si la tabla no tiene los campos created_at y updated_at
        underscored: true, //Si los nombres de las columnas en la db tienen guiones bajos en lugar de camelCase.
    }

    const Seguidor = sequelize.define(alias, cols, config);

    return Seguidor;
}
