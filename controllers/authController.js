const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verfy');

const login = async(req, res = response ) => {
    const { email, password } = req.body;
    try {
        // verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            })
        }

        // Generar el token
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const googleSingIn = async( req, res = response ) => {
    const googleToken = req.body.token;

    try {
        const { name, email, picture } = await googleVerify( googleToken );
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if ( !usuarioDB ) {
            // no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            // existe el usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar en DB
        await usuario.save;
        // Generar el token
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            msg: 'Google SingIn',
            token
        });
        
    } catch (error) {

        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto'
        
        });
    }
}

const renewToken = async(req, res = response ) => {
    const uid = req.uid;

    // Generar el TOKEN JWD
    const token = await generarJWT( uid );

    // Obtener el usuario por UID
    const usuario = await Usuario.findById( uid );

    res.json({
        ok: true,
        token,
        usuario
    })
}
 
module.exports = {
    login,
    googleSingIn,
    renewToken
}