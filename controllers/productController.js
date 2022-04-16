let modules = require('../db/modulo');
let productsDb = modules.productos;
let usuariodb = modules.usuarios;
let comentariosDb = modules.comentarios;

let productController =
{
    index: function(req, res) {
      let idProducto = req.params.id
      let productoMostrar = null
      // Por ahora, tenemos la ruta producto/id/idProducto (id:)
      // ProductoMostrar esta vacio. 
      // mi objetivo es crear un for que me recorra el array de productos
      //quiero ver que idProducto me coincida con el id dentro del array
      for (let index = 0; index < productsDb.lista.length; index++) {
        // este for va a recorrer desde la posición 0, que fue predeterminado a la posición numero 9
        if (idProducto == productsDb.lista[index].id) {
          productoMostrar = productsDb.lista[index]
          //la condicion que le estoy diciendo es la siguiente: hace la primera vuelta y va a la posición 0. 
          // si el idProducto (que era el id de la ruta) es igual al id del producto en especifico
          // entonces, quiero que me muestrar el producto en esa posición index, que en este caso era la posición 0
        }
      }
      if (productoMostrar != null) {
        //si no esta vacío yo quiero que me lo muestre
        // para hacer que me lo muestre debo renderizarlo. 
        return res.render ('product', {producto: productoMostrar, comentario: comentariosDb.lista});
      } else {
        productoMostrar = productsDb.lista[0]
         // siempre va a encontrar un producto a no ser que manualmente escribas la ruta
          // de todas maneras, decidimos que en caso de no encontrar el id buscado que mande al producto numero 0 en el array. 
      }},
      add : function(req, res) {
        return res.render('product-add',{usuario : usuariodb.lista[0] });
         }
/*       for (let i = 0; i < productsDb.lista.length; i++) {
        if (idProducto == productsDb.lista[i].id) {
          ProductoMostrar = productsDb.lista[i]
        } else {
          ProductoMostrar = productsDb.lista[0]
        }
      }
 */
};

module.exports = productController;