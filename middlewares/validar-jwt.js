const { response } = require("express");
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');



const validarJWT = (req, res = response, next) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }
    
    try {
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        req.uid = uid;
        next();
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }

}

validarAdminRole = async ( req, resp, next) => {

    try {
        const uid = req.uid;
        const usuarioDB = Usuario.findById(uid);

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            })
        }

        if ( usuarioDB !== 'ADMIN_ROLE') {
            return resp.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer esto.'
            })
        }

        next();
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrado'
        })
    }

}

validarAdminRoleAndMiUsuario = async ( req, resp, next) => {

    try {
        const uid = req.uid;
        const id = req.params.id;
        const usuarioDB = Usuario.findById(uid);

        if ( !usuarioDB ) {
            return resp.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            })
        }

        if ( usuarioDB === 'ADMIN_ROLE' && uid === id ) {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer esto.'
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrado'
        })
    }

}

module.exports = {
    validarJWT,
    validarAdminRole,
    validarAdminRoleAndMiUsuario
}