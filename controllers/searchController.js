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
        let buscada = req.query.search; // info del form por metodo get 
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