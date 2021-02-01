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

const actualizarHospital = async(req, res= response ) => {
    const id = req.params.id;
    const uid = req.uid;

    try {
        const hospital = await Hospital.findById( id );

        if ( !hospital ) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado'
            });
        }
        // esto es una forma menos recomendable: hospital.nombre = req.body.nombre;
        const cambiosHospital = {
            ...res.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHospital, { new: true } );
        res.json({
            ok: true,
            msg: 'Actualizar Hospital',
            hospital: hospitalActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error actualizar hospital, hable con el adminstrador'
        });
    }
}

const borrarHospital = async(req, res= response ) => {
    const id = req.params.id;

    try {
        const hospital = await Hospital.findById( id );

        if ( !hospital ) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado'
            });
        }

        await Hospital.findByIdAndDelete( id );
        res.json({
            ok: true,
            msg: 'Eliminado el Hospital'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error actualizar hospital, hable con el adminstrador'
        });
    }
}

module.exports = {
    getHospitales,
    creartHospital,
    actualizarHospital,
    borrarHospital
}