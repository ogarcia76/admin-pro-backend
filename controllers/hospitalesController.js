const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async(req, res= response ) => {
    const hospitales = await Hospital.find().populate('usuario', 'nombre img');
    res.json({
        ok: true,
        hospitales,
        msg: 'getHospitales'
    });
}

const creartHospital = async(req, res= response ) => {

    const uid = req.uid;
    const hospital = new Hospital( {
        usuario: uid,
        ...req.body
    });

    try {
        const hospitalDB = await hospital.save();
        res.json({
            ok: true,
            hospital: hospitalDB,
            msg: 'Creado un Hospital'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
   
}

const actualizarHospital = (req, res= response ) => {
    res.json({
        ok: true,
        msg: 'Actualizar Hospital'
    });
}

const borrarHospital = (req, res= response ) => {
    res.json({
        ok: true,
        msg: 'Borrar Hospital'
    });
}

module.exports = {
    getHospitales,
    creartHospital,
    actualizarHospital,
    borrarHospital
}