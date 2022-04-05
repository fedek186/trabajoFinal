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
    usuario: 'alfonso' // campo tipo email
    ,
    contraseña: 12345,//campo de tipo contraseña,
    recordarme: 'si'//campo de tipo checkbox
};

module.exports = loginController;