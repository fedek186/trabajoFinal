let productsDb = require('../db/productos')

let productController =
{
    index: function(req, res) {
      console.log(productsDb);
       res.render('product', {producto: productsDb});
      },
    add : function(req, res) {
        res.render('product-add');
       },
};

module.exports = productController;