const express = require("express");
const router = express.Router();

const userController = require('../controllers/userController');

//*rutas

//* REGISTER ROUTER
router.get('/register', userController.register); //! hay que definir las prop del userController.
router.post('/register', userController.procesarRegister); //! hay que definir las prop del userController.
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
