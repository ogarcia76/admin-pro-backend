/*  
    Hospitales
    Ruta: api/hospitales 
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getHospitales, creartHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitalesController');
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', getHospitales );

router.post( '/',
 [ 
   validarJWT,
   check('nombre', 'El nombre del hospital es necesario.').not().isEmpty(),
   validarCampos
 ],
 creartHospital )

 router.put( '/:id',
  [
  ],
  actualizarHospital );

  router.delete( '/:id', borrarHospital );

module.exports = router;