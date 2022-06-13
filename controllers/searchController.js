// var express = require('express');
/* const db = require("../database/models");
const prod = db.productos; // El alias que le pondre a mi modelo  
const op = db.Sequelize.Op; 
 */

const db = require('../database/models');
const producto = db.Producto;
const op = db.Sequelize.Op;

let searchController = {
    index: function (req, res) {
        let buscada = req.query.search;
        producto.findAll({
                where: {
                    nombre: {
                        [op.like]: "%" + buscada + "%"
                    }
                }
                //* le digo que busque una donde el nombre sea como la buscada y prometo que mando el res cuando lo tenga.
            })
            .then((result) => {
                console.log(result.dataValues);
                res.render('search-results', {
                    resultado: result //*llamo a resultado desde ejs para acceder a valores de result en vista
                })


                /*res.render('search-results', {
                    resultado : result           //*llamo a resultado desde ejs para acceder a valores de result en vista
                })
                // res.send(result)*/
            })

        //res.send('SBuscador')
    }
};

module.exports = searchController;

//! me quedan: - si el res de busqueda no tiene resultados. 
//! - index termino manana. hacer un scroll para los productos. cargar 5 o 6 a base de datos. 