var express = require('express');
var router = express.Router();
let products = require('../db/productos')

const controller = require('../controllers/searchController');

/* GET home page. */
router.get('/search',controller.index);

router.get('/:id', controller.search)


module.exports = router;
