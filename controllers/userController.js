/* //*Llamo la base de datos. 
const db = require('../database/models/usuarios');
const usuario = db.usuario;
const op = db.Sequelize.Op;
const bcrypt = require('bcryptjs'); */


let userController = {
    register : function(req, res) {
        res.send('Mostrar registro')
      },
      procesarRegister : function(req, res) {
        res.send('Procesar registro')
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
