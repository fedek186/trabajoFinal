var express = require('express');
/* const db = require("../database/models");
const prod = db.productos; // El alias que le pondre a mi modelo  
const op = db.Sequelize.Op; 
 */

let searchController =
{
    index: function(req, res) {
        res.send('hola')
    }
};

module.exports = searchController;