 //*Llamo la base de datos. 
const db = require('../database/models');
const Usuario = db.Usuario; //* Ahorramos codigo
// const op = db.Sequelize.Op; //* Da la posibilidad de trabajar con operadores
const bcrypt = require('bcryptjs'); //* Sirve para el hashing

let userController = {
    register : function(req, res) {
        return res.render ('register')
      },
      procesarRegister : function(req, res) {
        let info = req.body; 
        let usuario = {
          email: info.email,
          nombre_usuario: info.user,
          contrasenia: bcrypt.hashSync(info.password, 10),
          dni: info.dni,
          fecha_nacimiento: info.fechaDeNacimiento,
          foto_usuario: info.profilePic //* el info.nombre es el name del formulario, el foto_usuario viene de los modelos
        }
        Usuario.create(usuario)
            .then(function (result) {
                return res.redirect("/user/login")
            }).catch(function(errores) {
              console.log(errores);
            })
      },
      login : function(req, res) {
        res.send('Mostrar Login')
      },
      procesarLogin : function(req, res) {
        res.send('Procesar login')
      },
      logout : function(req, res) {
        res.send('procesar logout')
      },
      show : function(req, res) {
        res.send('Mostrar usuario')
      },
      edit : function(req, res) {
        res.send('Mostrar edit usuario')
      },
      procesarEdit : function(req, res) {
        res.send('procesar Edit usuario')
      },
}

module.exports = userController;
