var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');

//* Importaciones
let multer = require('multer'); 
let path = require('path');

//* Configuración multer
let storage = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/products'));
    },
    //* envía los archivos a public/images/users 

    filename : function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
    //* renombra el archivo con tal de que sea único. 
}); 

let upload = multer({storage : storage })

//*SHOW PROD
router.get('/id/:id', productController.show);
//*EDIT PROD
router.get('/id/edit/:id' , productController.edit);
router.post('/id/edit/:id', upload.single('fotoEdit'), productController.procesarEdit);
//*ADD PROD
router.get('/add' , productController.add);
router.post('/add', upload.single('foto'), productController.procesarAdd);
//*DELETE
router.get('/id/delete/:id' , productController.deleteProd);
//*ADD coment
router.post('/id/addComent/:id' , productController.addComent);
module.exports = router;
