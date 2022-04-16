var express = require('express');
var router = express.Router();
let modules = require('../db/modulo');
let products = modules.productos;

let searchController =
{
    index: function(req, res) {
        res.render('search-results.ejs');
    },
    search: function(req, res){
        let prodBuscado = req.params.id 
        let product = [];
        for (let i = 0; i < products.lista.length; i++){
            if (prodBuscado == products.lista[i].id){
                product.push(products.lista[i])
            }
        }
        if (product.length > 0){
            return res.render('search-results.ejs',{producto: product, tipo: true})
        } else {
            return res.render('search-results.ejs',{tipo:false,})
        }
    }
};

module.exports = searchController;