module.exports = function (sequelize, dataTypes) {
    
    /* Alias que le asigne */
    let alias = "Usuario";

    /* Configuraciones de las columnas de la tabla */
    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        nombre_usuario:{
            type: dataTypes.STRING,
        },
        email:{
            type: dataTypes.STRING,
        },
        contrasenia:{
            type: dataTypes.STRING,
        },
        fecha_nacimiento:{
            type: dataTypes.DATE,
        },
        dni:{
            type: dataTypes.INTEGER,
        },
        foto_usuario:{
            type: dataTypes.STRING,
        }
    }

    let config = {
        tableName: 'usuarios', 
        timestamps: false, //Si la tabla no tiene los campos created_at y updated_at
        underscored: true, //Si los nombres de las columnas en la db tienen guiones bajos en lugar de camelCase.
    }

//Agregar CreatedAt y Upadated At yt Relacion co productoas

const Usuario = sequelize.define(alias, cols, config);

    Usuario.associate = (models) => {
        Usuario.hasMany(models.Comentario, {
            as: 'comentarioDeUsuario',
            foreignKey: 'id_usuario'
        }) ,
        Usuario.hasMany(models.Producto, {
            as: 'productoDeUsuario',
            foreignKey: 'id_usuario'
        }) 
    } 

    return Usuario;
}