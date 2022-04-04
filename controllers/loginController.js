const usuarios = require ('../db/usuarios');
const productos = require ('../db/productos');
let loginController =
{
    index: function(req, res) {
       res.render('login');
      },
};

module.exports = loginController;