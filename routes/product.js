var express = require('express');
var router = express.Router();

const controller = require('../controllers/productController');

/* GET home page. */
router.get('/',controller.index);
router.get('/edit',controller.edit);

module.exports = router;
