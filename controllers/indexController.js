let modules = require('../db/modulo');
const productos = modules.opciones.productos;

let indexController =
{index: function (req,res) {
  return res.render('index', {products: productos});
}};

module.exports = indexController;
