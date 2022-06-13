const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');

//* Importaciones
let multer = require('multer'); 
let path = require ('path');

//* Configuración multer
let almacenamiento = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/users'));
    },
    filename : function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
}); 

let upload = multer({storage : almacenamiento })

//*rutas

//* REGISTER ROUTER
router.get('/register', userController.register); //! hay que definir las prop del userController.
router.post('/register', upload.single('profilePic'), userController.procesarRegister); //* Img perfil es el name del formulario
//*LOGIN ROUTER
router.get('/login', userController.login);
router.post('/login', userController.procesarLogin);
//*LOGOUT 
router.post('/logout', userController.logout);
//*SHOW USER
router.get('/', userController.show);
//*EDIT USER
router.get('/edit' , userController.edit);
router.post('/edit', userController.procesarEdit);
module.exports = router;
