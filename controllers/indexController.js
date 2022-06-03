let modules = require('../db/modulo');
const productos = modules.productos;
const db = require("../database/models");
const movie = db.Movie; /* El alias que le pongo a mi modelo */
const op = db.Sequelize.Op;

let indexController =
{index: function (req,res) {
  return res.render('index', {products: productos});
}};

module.exports = indexController;
