const productos = require('../db/productos')
const usuarios = require ('../db/usuarios')
let indexController =
{index: function (req,res) {
  res.render('index')
}};

module.exports = indexController;
//    index: function(req, res) {
/*   res.render('index', { title: 'Express' });
},
foto: function (req,res) {
res.send (productos.lista[0].foto)
} */
