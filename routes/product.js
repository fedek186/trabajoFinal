var express = require('express');
var router = express.Router();

const productController = require('../controllers/productController');

//*SHOW PROD
router.get('/', productController.show);
//*EDIT PROD
router.get('./edit' , productController.edit);
router.post('./edit', productController.procesEdit);
//*ADD PROD
router.get('./edit' , productController.add);
router.post('./edit', productController.procesAdd);

module.exports = router;
