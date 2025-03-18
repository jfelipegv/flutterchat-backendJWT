/*
    path: api/login
*/

const { Router } = require('express');
const { crearUsuario, login, renovarToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


router.post('/new',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'la contraseña es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email no tiene el formato correcto').isEmail(),
    validarCampos
],crearUsuario);

router.post('/',[
    check('password', 'la contraseña es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email no tiene el formato correcto').isEmail(),
],login);

router.get('/renovar',validarJWT, renovarToken);


module.exports = router;