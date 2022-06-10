/* let modules = require('../db/modulo');
let productsDb = modules.productos;
let usuariodb = modules.usuarios;
let comentariosDb = modules.comentarios; */
const db = require("../database/models");
const producto = db.Producto;  
const op = db.Sequelize.Op;


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
        let idProducto = req.params.id

        let relacion = {
          include: [
              {association: 'comentarioDeProducto'}, //son los As
          ]}; 


        producto.findByPk(idProducto,relacion)
        .then( (results)=> {
          console.log(results)
          res.render('product', {producto:results});
        })
        .catch((err) => {
          console.error(err);
      });
      
    },
      edit : function(req, res) {
        res.send('Mostrar edit producto')
      },
      procesarEdit : function(req, res) {
        res.send('procesar Edit producto')
      },
      add : function(req, res) {
        res.render('product-add')
      },
      procesarAdd : function(req, res) {
        let productoAcrear = req.body;
        producto.create({
          foto: productoAcrear.foto,
          nombre: productoAcrear.nombre,
          desc:productoAcrear.descripcion,
          date: productoAcrear.fecha,
          id_usuario: 1
      });
        res.redirect('/')
      }
};

module.exports = productController;