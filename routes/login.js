var express = require('express');
var router = express.Router();
const controller = require('../controllers/profileController');

/* GET home page. */
router.get('/',controller.login);

module.exports = router;
