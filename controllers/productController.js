let modules = require('../db/modulo');
let productsDb = modules.productos;
let usuariodb = modules.usuarios;
let comentariosDb = modules.comentarios;

let productController =
{
    index: function(req, res) {
       res.render('product', {producto: productsDb, comentario: comentariosDb.lista});
      },
    add : function(req, res) {
        res.render('product-add',{usuario : usuariodb.lista[0] });
       },
};

module.exports = productController;