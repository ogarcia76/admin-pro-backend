/*  
    Medicos
    Ruta: api/medicos 
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getMedicos, creartMedico, actualizarMedico, borrarMedico } = require('../controllers/medicosController');

const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', getMedicos );

router.post( '/',
 [ 
  validarJWT,
  check('nombre', 'El nombre del médico es necesario.').not().isEmpty(),
  check('hospital', 'El hospital id  debe ser válido').isMongoId(),
  validarCampos
 ],
 creartMedico )

 router.put( '/:id',
  [
  ], 
  actualizarMedico );

  router.delete( '/:id', borrarMedico );

module.exports = router;