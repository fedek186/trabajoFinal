// var express = require('express');
/* const db = require("../database/models");
const prod = db.productos; // El alias que le pondre a mi modelo  
const op = db.Sequelize.Op; 
 */

const db = require('../database/models');
const producto = db.Producto;
const op = db.Sequelize.Op;

let searchController = {
    index: (req, res) => {
        let buscada = req.query.search;
        producto.findAll({
                where: {
                    [op.or]: [
                        {nombre: {[op.like]: "%" + buscada + "%"}},
                        {descripcion: {[op.like]: "%" + buscada + "%"}}
                    ]
                } ,
                include: [{association:"usuarioRelacionado"}]
            })
            .then((result) => {
                res.render('search-results', {
                    resultado: result, 
                    palabraBuscada: buscada
                })
            })
    }
};

module.exports = searchController;

//! me quedan: - si el res de busqueda no tiene resultados. 
//! - index termino manana. hacer un scroll para los productos. cargar 5 o 6 a base de datos. 