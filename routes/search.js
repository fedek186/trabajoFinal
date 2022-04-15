var express = require('express');
var router = express.Router();

const controller = require('../controllers/searchController');

/* GET home page. */
router.get('/search-results',controller.index);

router.get('/:id', controller.search)


module.exports = router;
