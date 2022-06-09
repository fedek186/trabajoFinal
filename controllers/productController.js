/* let modules = require('../db/modulo');
let productsDb = modules.productos;
let usuariodb = modules.usuarios;
let comentariosDb = modules.comentarios; */
/* const db = require("../database/models");
const movie = db.Movie;  
const op = db.Sequelize.Op;*/


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
        return res.render ('product', {producto: productoMostrar, comentarios: comentariosDb.lista});
      } else {
        //Nosotros para que siempre muestre un producto decidimos que si el ID ingresado (de manera manual) no existe mostremos un producto predeterminado siendo el mismo el que se encuentra en la pos 0 del array
        productoMostrar = productsDb.lista[0]
        return res.render ('product', {producto: productoMostrar, comentarios: comentariosDb.lista});
      }},
     /*  add : function(req, res) {
        return res.render('product-add',{usuario : usuariodb.lista[0] });
        }, */
      show : function(req, res) {
        res.send('Mostrar producto')
      },
      edit : function(req, res) {
        res.send('Mostrar edit producto')
      },
      procesarEdit : function(req, res) {
        res.send('procesar Edit producto')
      },
      add : function(req, res) {
        res.send(' Add producto')
      },
      procesarAdd : function(req, res) {
        res.send('procesar Add producto')
      }
};

module.exports = productController;