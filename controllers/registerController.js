var express = require('express');
var router = express.Router();
let registerController =
{
    index: function(req, res) {
        res.render('register.ejs');
    },
};

module.exports = registerController;