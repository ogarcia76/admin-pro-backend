const { response } = require('express');
const Medico = require('../models/medicos');

const getMedicos = async(req, res= response ) => {
    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre');

    res.json({
        ok: true,
        medicos,
        msg: 'getMedicos'
    });
}

const creartMedico = async(req, res= response ) => {

    const uid = req.uid;
    const medico = new Medico( {
        usuario: uid,
        ...req.body
    });

    try {
        const medicolDB = await medico.save();
        res.json({
            ok: true,
            medico: medicolDB,
            msg: 'Creado un médico'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarMedico = (req, res= response ) => {
    res.json({
        ok: true,
        msg: 'Actualizar Medico'
    });
}

const borrarMedico = (req, res= response ) => {
    res.json({
        ok: true,
        msg: 'Borrar Medico'
    });
}

module.exports = {
    getMedicos,
    creartMedico,
    actualizarMedico,
    borrarMedico
}