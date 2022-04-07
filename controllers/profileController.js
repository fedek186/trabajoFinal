
let usuariodb = require ('../db/usuarios')
let profileController =
{
    index: function(req, res) {
       res.render('profile', {usuario : usuariodb.lista[0]});
      },
    edit: function(req, res) {
        res.render('profile-edit');
       }
    //el usuario ya va a estar logeado para entrar en profile asi que eso no es un problema
    // esos datos serían: el nombre, el email, la foto y el nombre de usuario arriba a la derecha

};

module.exports = profileController;