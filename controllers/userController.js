 //*Llamo la base de datos. 
const db = require('../database/models');
const Usuario = db.Usuario; //* Ahorramos codigo
// const op = db.Sequelize.Op; //* Da la posibilidad de trabajar con operadores
const bcrypt = require('bcryptjs'); //* Sirve para el hashing

let userController = {
    register : function(req, res) {
      return res.render ('register')
    },
    procesarRegister : function(req, res) {
      let info = req.body; 
      imgPerfil = req.file.filename;
      let filtroRegister = {where: [ { email: info.email}]};
      let errors = {};
      if (info.email == "") {
        errors.message = "Hay un error! El mail no puede estar vacio";
        res.locals.errors = errors;
        return res.render ("register")
      } else if (info.password < 3) {
        errors.message = `Hay un error! La contraseña debe tener 3 caracteres o más`;
        res.locals.errors = errors;
        return res.render ("register")
      } else {
          Usuario.findOne(filtroRegister)
          .then((result) => {
          if (result != null) {
            errors.message = `Hay un error! El mail ingresado ya existe. `;
            res.locals.errors = errors;
            return res.render ("register")
          } 
          else {
            let usuario = {
              email: info.email,
              nombre_usuario: info.username,
              contrasenia: bcrypt.hashSync(info.password, 10),
              dni: info.dni,
              fecha_nacimiento: info.fechaDeNacimiento, //* el info.nombre es el name del formulario, el foto_usuario viene de los modelos
              foto_usuario: imgPerfil 
            }
            Usuario.create(usuario)
                .then(function () {
                    return res.redirect("/user/login")
                }).catch(function(errores) {
                  console.log(errores);
                })  
            }
          }).catch(function(errores) {
              console.log(errores)
          })
      }
    },
      login : function(req, res) {
        res.render('login')
      },
      procesarLogin : function(req,res) {
        let info = req.body
        let filtroLogin = {where: [ { email: info.email}]};
        let errors = {}
        if (info.email == "") {
          errors.message = "Hay un error! El mail no puede estar vacio.";
          res.locals.errors = errors;
          return res.render ("login")
        } else {
          Usuario.findOne(filtroLogin)
          .then((result) => {  
            if (result != null) {
              let check = bcrypt.compareSync(info.password , result.contrasenia)
              if (check) {
                req.session.user = result.dataValues;
                if(info.remember != undefined) {
                  res.cookie('userId', result.dataValues.id, {maxAge: 1000 * 60 * 1000}) //* voy a enviarle al navegador la cookie
                }
                return res.redirect("/") //* Aca lo estoy redireccionando a index para probar si se crea la sesion
              } 
              else {
                errors.message = "La clave es incorrecta";
                res.locals.errors = errors;
                return res.render ("login")
              }
            }
            else {
              errors.message = "Hay un error! El mail ingresado no existe";
              res.locals.errors = errors;
              return res.render ("login")
            }
          }).catch(function(errores) {
            console.log(errores)
          })  
        }  
      },
      logout : function(req, res) {
        let info = req.body;
        if (info.logout != undefined) { //* aca inventé el "logout" pero creo que sería así. Antes de poder hacer esto tenemos que renderizar las páginas. 
          req.session.destroy();
          res.clearCookie('userId')
          return res.redirect('/')
        }
      },
      show : function(req, res) {
        res.send('Mostrar usuario')
      },
      edit : function(req, res) {
        res.send('Mostrar edit usuario')
      },
      procesarEdit : function(req, res) {
        res.send('procesar Edit usuario')
      },
}

module.exports = userController;
