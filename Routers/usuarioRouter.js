/* 
  Usuarios
  Ruta: api/usuarios 
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { getUsuarios, crearUsuarios, actualizarUsuario, borrarUruario } = require('../controllers/usuariosController');
const { validarJWT, validarAdminRole, validarAdminRoleAndMiUsuario } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getUsuarios );

router.post( '/',
 [ 
    check('nombre', 'El nombre es obligatorio' ).not().isEmpty(),
    check('password', 'El password es obligatorio' ).not().isEmpty(),
    check('email', 'El email es obligatorio' ).isEmail(),
    validarCampos
 ],
 crearUsuarios )

 router.put( '/:id',
  [
    validarJWT,
    validarAdminRoleAndMiUsuario,
    check('nombre', 'El nombre es obligatorio' ).not().isEmpty(),
    check('role', 'El role es obligatorio' ).not().isEmpty(),
    check('email', 'El email es obligatorio' ).isEmail(),
    validarCampos
  ], 
  actualizarUsuario );

  router.delete( '/:id',[validarJWT, validarAdminRole], borrarUruario );

module.exports = router;