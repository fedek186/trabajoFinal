var express = require('express');
var router = express.Router();

const productController = require('../controllers/productController');

//*SHOW PROD
router.get('/:id', productController.show);
//*EDIT PROD
router.get('/edit' , productController.edit);
router.post('/edit', productController.procesarEdit);
//*ADD PROD
router.get('/add' , productController.add);
router.post('/add', productController.procesarAdd);

module.exports = router;
