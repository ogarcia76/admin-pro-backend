const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpload = async(req, res = response ) => {
    const tipo = req.params.tipo;
    const id = req.params.id;

    // Validar tipo
    const tiposValidos = [ 'hospitales', 'medicos', 'usuarios'];
    if ( !tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un médico, usuario u hospital'
        })
    }
    // Validar que exista una imagen
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }
    // Procesar la imagen
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];

    // Validar extensiones
    const extensionesValidas = [ 'png', 'png', 'jpeg', 'gif', 'pdf' ];
    if ( !extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida'
        })
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    // path para guardar la imagen
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    // Mover la imagen
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }
        
    // Actualizar imagen
    actualizarImagen( tipo, id, nombreArchivo );

        res.json({
            ok: true,
            nombreArchivo,
            msg: 'Archivo subido'
        });
    });
}

const retornaImagen = ( req, res = response ) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }` );

    if ( fs.existsSync( pathImg ) ) {
        res.sendFile( pathImg );
    } else {
        const pathImg = path.join( __dirname, `../uploads/no-img.png` );
        res.sendFile( pathImg );
    }

    
}

module.exports = {
    fileUpload,
    retornaImagen
}