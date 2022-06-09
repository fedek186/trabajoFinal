var express = require('express');
var router = express.Router();
/* const db = require("../database/models");
 const movie = db.Movie; /* El alias que le pondre a mi modelo  
const op = db.Sequelize.Op; */


let searchController =
{
    index: function(req, res) {
        res.send('search-results.ejs');
    }
};

module.exports = searchController;