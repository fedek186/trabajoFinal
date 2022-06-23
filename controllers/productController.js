const db = require("../database/models");
const producto = db.Producto;
const comentario = db.Comentario; //Preguntar si esta bien hacerlo en el controlador del producto
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
        {
          association: "usuarioRelacionado", //Producto Usuario. Llamo al usuario del producto y lo uso con producto.usariorelacion.columna
        },
      ],
        order: [['comentarioDeProducto','fecha', 'desc']] 
    };


    producto
      .findByPk(idProducto, relacion)
      .then((results) => {
        res.render("product", { producto: results });
      })
      .catch((err) => {
        console.error(err);
      });
  },
  edit: function (req, res) {
    let idProducto = req.params.id;
    producto
    .findByPk(idProducto)
    .then((results) => {
      res.render("product-edit", { producto: results });
    })
    .catch((err) => {
      console.error(err);
    });
  },
  procesarEdit: function (req, res) {
    let productoAeditar = req.body;
    let idProducto = req.params.id;
    let imgProductoEditar = null;
    let errors = {}
    req.session.errors = undefined; 
    if (req.session.user != undefined) {
      if (productoAeditar.nombre == "") {
          errors.message = "Nombre de producto no puede estar vacio";
          req.session.errors = errors;
          res.redirect('/product/id/edit/' + idProducto);
      } else if (productoAeditar.desc == "") {
          errors.message = "Descripcion de producto no puede estar vacio";
          req.session.errors = errors;
          res.redirect('/product/id/edit/' + idProducto);
        } else if (productoAeditar.date == "") {
          errors.message = "Fecha de producto no puede estar vacio";
          req.session.errors = errors; 
          res.redirect('/product/id/edit/' + idProducto);
        } else {
        if (req.file == undefined) {
            producto.update({
              nombre: productoAeditar.nombre,
              descripcion: productoAeditar.desc,
              fecha: productoAeditar.date
            },
            {
              where: {
                id:idProducto,
              }
            }
            )   
         } else {
          imgProductoEditar = req.file.filename; 
          producto.update({
          foto: imgProductoEditar,
          nombre: productoAeditar.nombre,
          descripcion: productoAeditar.desc,
          fecha: productoAeditar.date,
        },
        {
          where: {
            id:idProducto,
          }
        });};
        
        res.redirect("/product/id/" + idProducto);
      }
    } else {
        res.redirect("/user/login");
    }
  },
  add: function (req, res) {
    res.render("product-add");
  },
  procesarAdd: function (req, res) {
    let productoAcrear = req.body;
    let imgProducto = null;
    let errors = {};
    if (req.session.user != undefined) {
      if (productoAcrear.nombre == "") {
        errors.message = "Nombre de producto no puede estar vacio";
        res.locals.errors = errors;
        return res.render('product-add');
      } else if (productoAcrear.desc == "") {
        errors.message = "Descripción de producto no puede estar vacio";
        res.locals.errors = errors;
        return res.render('product-add');
      } else if (productoAcrear.date == "") {
        errors.message = "Fecha de producto no puede estar vacio";
        res.locals.errors = errors;
        return res.render('product-add');
        }  else if (req.file == undefined) {
          errors.message = `Hay un error! no ingreso una imagen`;
          res.locals.errors = errors;
          return res.render('product-add');
        }  
        else {
        imgProducto = req.file.filename;
        producto.create({
          foto: imgProducto,
          nombre: productoAcrear.nombre,
          descripcion: productoAcrear.desc,
          fecha: productoAcrear.date,
          id_usuario: req.session.user.id,
        });
        res.redirect("/");
      }
    } else {
        res.redirect("/user/login");
    }
  },
  addComent: (req, res) => {
    let comentarioAcrear = req.body;
    let idProducto = req.params.id;
    let errors = {};
    if (req.session.user != undefined) {
        comentario.create({
          comentario: comentarioAcrear.desc,
          fecha: Date.now(), //Forma de obtener la fecha actual
          id_usuario: req.session.user.id,
          id_producto: idProducto,
        }); 
        res.redirect("/product/id/" + idProducto);
    } else {
      res.redirect("/product/id/" + idProducto);
    }
  },
  deleteProd: (req, res) => {
    let idProducto = req.params.id;
    comentario.destroy({
      where: {
        id_producto: idProducto
      }
    })
    producto.destroy({
      where: {
        id: idProducto
      }
    });
    res.redirect("/");
  },
};

module.exports = productController;
