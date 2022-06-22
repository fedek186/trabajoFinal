//*Llamo la base de datos.
const db = require("../database/models");
const Usuario = db.Usuario; //* Ahorramos codigo
const modeloSeguir = db.Seguidor;
const op = db.Sequelize.Op; //* Da la posibilidad de trabajar con operadores
const bcrypt = require("bcryptjs"); //* Sirve para el hashing

let userController = {
  register: function (req, res) {
    return res.render("register");
  },
  procesarRegister: function (req, res) {
    let info = req.body;
    let imgPerfil = req.file.filename;
    let filtroRegister = { where: [{ email: info.email }] };
    let errors = {};
    if (info.email == "") {
      errors.message = "Hay un error! El mail no puede estar vacio";
      res.locals.errors = errors;
      return res.render("register");
    } else if (info.password < 3) {
      errors.message = `Hay un error! La contraseña debe tener 3 caracteres o más`;
      res.locals.errors = errors;
      return res.render("register");
    } else {
      Usuario.findOne(filtroRegister)
        .then((result) => {
          if (result != null) {
            errors.message = `Hay un error! El mail ingresado ya existe. `;
            res.locals.errors = errors;
            return res.render("register");
          } else {
            let usuario = {
              email: info.email,
              nombre_usuario: info.username,
              contrasenia: bcrypt.hashSync(info.password, 10),
              dni: info.dni,
              fecha_nacimiento: info.fechaDeNacimiento, //* el info.nombre es el name del formulario, el foto_usuario viene de los modelos
              foto_usuario: imgPerfil,
            };
            Usuario.create(usuario)
              .then(function () {
                return res.redirect("/user/login");
              })
              .catch(function (errores) {
                console.log(errores);
              });
          }
        })
        .catch(function (errores) {
          console.log(errores);
        });
    }
  },
  login: function (req, res) {
    res.render("login");
  },
  procesarLogin: function (req, res) {
    let info = req.body;
    let filtroLogin = { where: [{ email: info.email }] };
    let errors = {};
    if (info.email == "") {
      errors.message = "Hay un error! El mail no puede estar vacio.";
      res.locals.errors = errors;
      return res.render("login");
    } else {
      Usuario.findOne(filtroLogin)
        .then((result) => {
          if (result != null) {
            let check = bcrypt.compareSync(info.password, result.contrasenia);
            if (check) {
              req.session.user = result.dataValues;
              if (info.remember != undefined) {
                res.cookie("userId", result.dataValues.id, {
                  maxAge: 1000 * 60 * 1000,
                }); //* voy a enviarle al navegador la cookie
              }
              return res.redirect("/"); //* Aca lo estoy redireccionando a index para probar si se crea la sesion
            } else {
              errors.message = "La clave es incorrecta";
              res.locals.errors = errors;
              return res.render("login");
            }
          } else {
            errors.message = "Hay un error! El mail ingresado no existe";
            res.locals.errors = errors;
            return res.render("login");
          }
        })
        .catch(function (errores) {
          console.log(errores);
        });
    }
  },
  logout: function (req, res) {
    let info = req.body;
    if (info.logout != undefined) {
      //* aca inventé el "logout" pero creo que sería así. Antes de poder hacer esto tenemos que renderizar las páginas.
      req.session.destroy();
      res.clearCookie("userId");
      return res.redirect("/");
    }
  },
  show: function (req, res) {
    let idUsuario = req.params.id;

    let relacion = {
      include: [
        { association: "productoDeUsuario" },
        { association: "comentarioDeUsuario" },
        { association: "leSiguen" },
        { association: "sigue" },
      ],
    };
    Usuario.findByPk(idUsuario, relacion)
      .then((results) => {
        res.render("profile", { usuario: results });
      })
      .catch((err) => {
        console.error(err);
      });
  },
  edit: function (req, res) {
    let idUsuario = req.params.id;
    let user = null;
    Usuario.findByPk(idUsuario)
      .then((result) => {
        user = result.dataValues;
        res.render("profile-edit", { usuario: user });
      })
      .catch((err) => {
        console.error(err);
      });
  },
  procesarEdit: function (req, res) {
    let usuarioAeditar = req.body;
    let idUsuario = req.params.id;
    let imgUsuarioEditar = null;

    console.log(req.file, "CONCHA");

    if (req.session.user != undefined) {
      if (usuarioAeditar.usuario == "") {
        res.redirect("/user/edit/id/" + idUsuario);
      } else if (usuarioAeditar.dni == "") {
        /* errors.message = "Descripcion de producto no puede estar vacio";
         res.locals.error = errors.message; */
        res.redirect("/user/edit/id/" + idUsuario);
      } else if (usuarioAeditar.date == "") {
        /* errors.message = "Fecha de producto no puede estar vacio";
         res.locals.error = errors.message; */
        res.redirect("/user/edit/id/" + idUsuario);
      } else {
        Usuario.findAll()
          .then((result) => {
            let encontroEmail = false;
            for (let i = 0; i < result.length; i++) {
              if (
                usuarioAeditar.email == result[i].email &&
                idUsuario != result[i].id
              ) {
                encontroEmail = true;
              }
            }
            if (encontroEmail == false) {
              if (req.file == undefined) {
                Usuario.update(
                  {
                    nombre_usuario: usuarioAeditar.usuario,
                    email: usuarioAeditar.email,
                    dni: usuarioAeditar.dni,
                    fecha_nacimiento: usuarioAeditar.date,
                  },
                  {
                    where: {
                      id: idUsuario,
                    },
                  }
                );
                res.redirect("/user/" + idUsuario);
              } else {
                imgUsuarioEditar = req.file.filename;
                Usuario.update(
                  {
                    nombre_usuario: usuarioAeditar.usuario,
                    email: usuarioAeditar.email,
                    dni: usuarioAeditar.dni,
                    fecha_nacimiento: usuarioAeditar.date,
                    foto_usuario: imgUsuarioEditar,
                  },
                  {
                    where: {
                      id: idUsuario,
                    },
                  }
                );
                res.redirect("/user/" + idUsuario);
              }
            } else {
              res.redirect("/user/edit/id/" + idUsuario);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      res.redirect("/login");
    }
  },
  seguir: function (req, res) {
    let idUsuarioAseguir = req.params.id;
    let filtro = { where: [{ id_seguido: idUsuarioAseguir }] }; //traer todos la gente que sigue al usuario
    modeloSeguir
      .findAll(filtro)
      .then((result) => {
        let array = [] //Almacenar las relaciones -> Dos opciones: [] / [true]
        //Esta la relacion creada?
        for (let i = 0; i < result.length; i++) {
          if(result[i].id_seguidor == req.session.user.id) { //es el mi id = a uno de los ids que sigue al otro
            array.push(true) 
          } 
        }
        if (array.length > 0) {
          //si lo encuentra significa que ya lo seguia por lo tanto lo esta dejando de seguir
          modeloSeguir.destroy({
            where: {
              [op.and]: [
                { id_seguido: idUsuarioAseguir },
                { id_seguidor: req.session.user.id },
              ],
            },
          });
        } else {
          //sino lo encuentra significa que no lo seguia por lo tanto lo tiene que empezar a seguir
          modeloSeguir.create({
            id_seguido: idUsuarioAseguir,
            id_seguidor: req.session.user.id,
          });
        }
        res.redirect("/user/" + idUsuarioAseguir);
      })
      .catch((err) => {
        console.error(err);
      })
  },
};

module.exports = userController;
