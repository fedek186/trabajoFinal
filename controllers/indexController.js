const productos = {
  lista: [
    {
    id: 1,
    foto: '/images/products/jordan12Playoff.png',
    nombre: "AIR JORDAN 12 playoff",
    desc: "In celebration of its 25th Anniversary, Jordan Brand brought back the shoe that Michael Jordan wore while winning his 5th NBA Title, the Air Jordan 12 Retro Playoffs.",
    fecha: "15 de enero",
    comentarios: "Hola"
}]
}  
/*
const db = require("../database/models");
const movie = db.Movie;  El alias que le pongo a mi modelo 
const op = db.Sequelize.Op; */

// const db = require('../database/models/productos');
// const productos = db.Producto;
// const op = db.Sequelize.Op;

let indexController = {
  index: function (req, res) {
    return res.render('index', {
      products: productos
    });
    // res.send(productos)
  }
};

module.exports = indexController;