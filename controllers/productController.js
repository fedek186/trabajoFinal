let modules = require('../db/modulo');
let productsDb = modules.productos;
let usuariodb = modules.usuarios;
let comentariosDb = modules.comentarios;

let productController =
{
    index: function(req, res) {
      let idProducto = req.params.id
      let productoMostrar = null
      for (let index = 0; index < productsDb.lista.length; index++) {
        if (idProducto == productsDb.lista[index].id) {
          productoMostrar = productsDb.lista[index]
        }
      }
      if (productoMostrar != null) {
        return res.render ('product', {producto: productoMostrar, comentario: comentariosDb.lista});
      } else {
        productoMostrar = productsDb.lista[0]
      }},
      add : function(req, res) {
        return res.render('product-add',{usuario : usuariodb.lista[0] });
         }
};

module.exports = productController;