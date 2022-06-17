/* let modules = require('../db/modulo');
let productsDb = modules.productos;
let usuariodb = modules.usuarios;
let comentariosDb = modules.comentarios; */
const db = require("../database/models");
const producto = db.Producto;
const op = db.Sequelize.Op;

let productController = {
  show: function (req, res) {
    let idProducto = req.params.id;

    let relacion = {
      include: [
        {
          association: "comentarioDeProducto",
          include: [{ association: "usuarioRelacionado" }],
        },
      ],
    };
    producto
      .findByPk(idProducto, relacion)
      .then((results) => {
        console.log(results);
        res.render("product", { producto: results });
      })
      .catch((err) => {
        console.error(err);
      });
  },
  edit: function (req, res) {
    res.send("Mostrar edit producto");
  },
  procesarEdit: function (req, res) {
    res.send("procesar Edit producto");
  },
  add: function (req, res) {
    res.render("product-add");
  },
  procesarAdd: function (req, res) {
    let productoAcrear = req.body;

    if (productoAcrear.nombre == "") {
      /* errors.message = "Nombre de producto no puede estar vacio";
        res.locals.error = errors.message; */
      res.redirect("/product/add");
    } else if (productoAcrear.foto == "") {
      /* errors.message = "Foto de producto no puede estar vacio";
      res.locals.error = errors.message; */
      res.redirect("/product/add");
    } else if (productoAcrear.desc == "") {
      /* errors.message = "Descripcion de producto no puede estar vacio";
      res.locals.error = errors.message; */
      res.redirect("/product/add");
    } else if (productoAcrear.date == "") {
      /* errors.message = "Fecha de producto no puede estar vacio";
      res.locals.error = errors.message; */
      res.redirect("/product/add");
    } else {
      producto.create({
        foto: productoAcrear.foto,
        nombre: productoAcrear.nombre,
        desc: productoAcrear.descripcion,
        date: productoAcrear.fecha,
        id_usuario: 1,
      });
      res.redirect("/");
    }
  },
};

module.exports = productController;
