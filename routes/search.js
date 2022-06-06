var express = require('express');
var router = express.Router();

const controller = require('../controllers/searchController');

/* GET home page. */
router.get('/search/',controller.index);



module.exports = router;
