let modules = require('../db/modulo');
let productsDb = modules.opciones.productos;
let usuariodb = modules.opciones.usuarios;
let comentariosDb = modules.opciones.comentarios;

let productController =
{
    index: function(req, res) {
       res.render('product', {producto: productsDb, comentario: comentariosDb.lista});
      },
    add : function(req, res) {
        res.render('product-add',{usuario : usuariodb.lista });
       },
};

module.exports = productController;