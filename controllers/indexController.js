const productos = {
  lista: [{
    id: 1,
    foto: '/images/products/jordan12Playoff.png',
    nombre: "AIR JORDAN 12 playoff",
    desc: "In celebration of its 25th Anniversary, Jordan Brand brought back the shoe that Michael Jordan wore while winning his 5th NBA Title, the Air Jordan 12 Retro Playoffs.",
    fecha: "15 de enero",
    comentarios: "Hola"
  }]
}

/*let indexController = {
  index: function (req, res) {
    /* return res.render('index', {products: productos}); */
/*res.render('header'); //* aca renderize el header para ver si la session estaba funcionando
  }
};*/

const db = require('../database/models');
const producto = db.Producto;
const op = db.Sequelize.Op;

let indexController = {
  findAll: (req, res) => {
    producto.findAll({
      include: [{association: "usuarioRelacionado"}]
    })
      .then((result) => {
        return res.render('index', {
          resultados: result,
          products: productos
        })
      })
  }
};

module.exports = indexController;