let productsDb = require('../db/productos')
let usuariodb = require('../db/usuarios')
let productController =
{
    index: function(req, res) {
      console.log(productsDb);
       res.render('product', {producto: productsDb});
      },
    add : function(req, res) {
        res.render('product-add',{usuario : usuariodb.lista[0]});
       },
};

module.exports = productController;