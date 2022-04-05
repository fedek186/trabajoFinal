const usuarios = require ('../db/usuarios');
const productos = require ('../db/productos');
let loginController =
{
    index: function(req, res) {
       return res.render('login', {
           listaDeProductos : productos.lista
    }
    )
},
    usuario: // campo tipo email
    ,
    contraseña: //campo de tipo contraseña,
    recordarme://campo de tipo checkbox
};

module.exports = loginController;