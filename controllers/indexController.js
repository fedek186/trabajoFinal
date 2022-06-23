const db = require('../database/models');
const producto = db.Producto;

const op = db.Sequelize.Op;

let indexController = {

  findAll: (req, res) => {
    let relacion = {
      include: [{association: "usuarioRelacionado"}],
      order: [['fecha','DESC']]  
    }

    producto.findAll(relacion)
      .then((result) => {
        return res.render('index', {
          resultados: result,
        })
      })
      .catch((err) => {console.log(err)});
  } 
};

module.exports = indexController;