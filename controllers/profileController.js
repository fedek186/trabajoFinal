let modules = require('../db/modulo');
let usuariodb = modules.opciones.usuarios;
let productodb = modules.opciones.productos;

let profileController =
{
    index: function(req, res) {
       res.render('profile', {usuario : usuariodb.lista[0], productos: productodb.lista});
      },
    edit: function(req, res) {
        return res.render('profile-edit', {usuario : usuariodb.lista[0]});
       },
    register: function(req, res) {
        res.render('register.ejs');
    },
    login: function(req, res) {
        res.render('login.ejs');
    }

};

module.exports = profileController;