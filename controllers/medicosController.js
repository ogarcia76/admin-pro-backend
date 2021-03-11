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

const getMedicoById = async(req, res= response ) => {
    const id = req.params.id;

    try {

        const medico = await Medico.findById(id)
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre');

        res.json({
            ok: true,
            medico,
            msg: 'getMedicoById'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        });
    }
    
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

const actualizarMedico = async(req, res= response ) => {
    const id = req.params.id;
    const uid = req.uid;

    try {
        const medico = await Medico.findById( id );

        if ( !medico ) {
            return res.status(404).json({
                ok: false,
                msg: 'Médico no encontrado'
            });
        }
        // esto es una forma menos recomendable: hospital.nombre = req.body.nombre;
        const cambiosMedico = {
            ...res.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate( id, cambiosMedico, { new: true } );
        res.json({
            ok: true,
            msg: 'Actualizar Médico',
            medico: medicoActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error actualizar médico, hable con el adminstrador'
        });
    }
}

const borrarMedico = async(req, res= response ) => {
    const id = req.params.id;

    try {
        const medico = await Medico.findById( id );

        if ( !medico ) {
            return res.status(404).json({
                ok: false,
                msg: 'Médico no encontrado'
            });
        }

        await Medico.findByIdAndDelete( id );
        res.json({
            ok: true,
            msg: 'Médico Borrado'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error actualizar médico, hable con el adminstrador'
        });
    }
}

module.exports = {
    getMedicos,
    creartMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById
}