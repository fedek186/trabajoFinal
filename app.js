var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');


//* Requerimiento de DB
const db = require('./database/models');

const indexRouter = require('./routes/index');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user')
const searchRouter = require('./routes/search');

//ANvl
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //Todos los archivos que esten dentro de la carpeta public son estaticos.

//* Configuramos el session 
app.use(session( { 
  secret: "NWZapatillas", 
  resave: false, 
  saveUninitialized: true
}));

//* Middleware de session. Debe estar antes de la declaración de las rutas. 
app.use(function(req,res, next) {
   //* Aca evaluo la condicion creada en el procesarLogin
  if(req.session.user != undefined) {
    res.locals.user = req.session.user
    return next ()
  }
  return next () //* Si no entra en el if que siga al próximo middleware
});

//* Middleware de session. Debe estar antes de la declaración de las rutas. 
app.use(function(req,res, next) {
  //* Aca evaluo la condicion creada en el procesarLogin
 if(req.session.errors != undefined) {
   res.locals.errors = req.session.errors;
   return next ()
 }
 return next () //* Si no entra en el if que siga al próximo middleware
});

//* Middleware de cookies. 
app.use(function (req,res,next) {
  if (req.cookies.userId != undefined && req.session.user == undefined) {
    //* la cookie se "activa" cuando se pierde la sesion
    let idUsuarioEnCookie = req.cookies.userId;

    db.Usuario.findByPk(idUsuarioEnCookie)
    .then((result) => {
      req.session.user = result.dataValues;
      res.locals.user = req.session.user; 
      return next();
    }).catch (function (errores) {
      console.log(errores);
    });
  } 
    else {
      return next ();
  }
}) 

app.use('/', indexRouter);
app.use('/product', productRouter);
app.use('/user', userRouter);
app.use('/search', searchRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
