var express = require('express');
var router = express.Router();

const productController = require('../controllers/productController');

//*SHOW PROD
router.get('/id/:id', productController.show);
//*EDIT PROD
router.get('/id/edit/:id' , productController.edit);
router.post('/id/edit/:id', productController.procesarEdit);
//*ADD PROD
router.get('/add' , productController.add);
router.post('/add', productController.procesarAdd);
//*DELETE
router.get('/id/delete/:id' , productController.deleteProd);
//*ADD coment
router.post('/id/addComent/:id' , productController.addComent);
module.exports = router;
