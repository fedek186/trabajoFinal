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
            type: dataTypes.INTEGER,  // El sigue (seguidos). Sigo a 200 person en IG = a 200 id_seguidor
        },
        id_seguido: {
            type: dataTypes.INTEGER, // A el lo siguen (seguidos). Tengo 500 seguidores en IG = a 500 id_seguido
        }
    }

    let config = {
        tableName: 'seguidor_seguidos', 
        timestamps: false, //Si la tabla no tiene los campos created_at y updated_at
        underscored: true, //Si los nombres de las columnas en la db tienen guiones bajos en lugar de camelCase.
    }

    const Seguidor = sequelize.define(alias, cols, config);

    Seguidor.associate = (models) => {
        Seguidor.belongsTo(models.Usuario, {
            as: 'seguidor',
            foreignKey: 'id_seguidor'
        }) ,
        Seguidor.belongsTo(models.Usuario, {
            as: 'seguido',
            foreignKey: 'id_seguido'
        })
    }

    return Seguidor;
}
