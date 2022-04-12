let productsDb = require('../db/productos')
let usuariodb = require('../db/usuarios')
let comentariosDb = require('../db/comentario')
let productController =
{
    index: function(req, res) {
       res.render('product', {producto: productsDb, comentario: comentariosDb.lista});
      },
    add : function(req, res) {
        res.render('product-add',{usuario : usuariodb.lista});
       },
};

module.exports = productController;