module.exports = function (sequelize, dataTypes) {
    
    /* Alias que le asigne */
    let alias = "Usuario";

    /* Configuraciones de las columnas de la tabla */
    let cols = {
        idUsuario:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        nombreDeUsuario:{
            type: dataTypes.STRING,
        },
        email:{
            type: dataTypes.STRING,
        },
        contrasenia:{
            type: dataTypes.STRING,
        },
        fechaDeNacimiento:{
            type: dataTypes.DATE,
        },
        dni:{
            type: dataTypes.INTEGER,
        },
        fotoUsuario:{
            type: dataTypes.STRING,
        }
    }

    let config = {
        tableName: 'Usuario', 
        timestamps: true, //Si la tabla no tiene los campos created_at y updated_at
        underscored: false, //Si los nombres de las columnas en la db tienen guiones bajos en lugar de camelCase.
    }

    const Usuario = sequelize.define(alias, cols, config);

    return Usuario;
}