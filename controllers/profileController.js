let modules = require('../db/modulo');
let usuariodb = modules.usuarios;
let productodb = modules.productos;
const db = require("../database/models");
const movie = db.Movie; /* El alias que le pondre a mi modelo */
const op = db.Sequelize.Op;


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