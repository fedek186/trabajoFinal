var express = require('express');
var router = express.Router();

const controller = require('../controllers/productController');

/* GET home page. */
router.get('/id/:id',controller.index);
router.get('/add',controller.add);
module.exports = router;
