const { response } = require('express');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medicos');

const getTodo = async(req, res= response ) => {
    const busqueda = req.params.busqueda;
    const regExp = new RegExp( busqueda, 'i');

    const [ usuarios, hospitales, medicos ] = await Promise.all([
        Usuario.find({ nombre: regExp }),
        Hospital.find({ nombre: regExp }),
        Medico.find({ nombre: regExp }),
    ]);

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales,
        msg: 'get todo'
    });
}

const getDocumentoColleccion = async(req, res= response ) => {
    const tabla     = req.params.tabla;
    const busqueda  = req.params.busqueda;
    const regExp    = new RegExp( busqueda, 'i');
    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({nombre: regExp })
                                .populate('usuario', 'nombre img');
        break;

        case 'hospitales':
            data = await Hospital.find({nombre: regExp })
                                  .populate('usuario', 'nombre img');  
        break;

        case 'usuarios':
            data = await Usuario.find({nombre: regExp })
                                 .populate('usuario', 'nombre img'); 
        break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
            });
    }

    res.json({
        ok: true,
        resultado: data
    }); 
}

module.exports = {
    getTodo,
    getDocumentoColleccion
}