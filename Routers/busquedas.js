/*  
    Hospitales
    Ruta: api/todo/:busqueda 
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');
const { getTodo, getDocumentoColleccion } = require('../controllers/busquedas')

const router = Router();

router.get( '/:busqueda', validarJWT, getTodo );
router.get( '/coleccion/:tabla/:busqueda', validarJWT, getDocumentoColleccion );


module.exports = router;