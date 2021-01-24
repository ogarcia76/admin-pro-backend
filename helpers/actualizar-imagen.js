const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medicos');
const Hospital = require('../models/hospital');

const borrarImagen = ( path ) => {
    if ( fs.existsSync( path) ) {
        // borrar la imagen anterior
        fs.unlinkSync( path );
    }
}
const actualizarImagen = async( tipo, id, nombreArchivo ) => {

    let pathViejo = '';

    switch (tipo) {
        case 'usuarios':
            const ususario = await Usuario.findById(id);
            if ( !ususario ) {
                return false;
            }

            pathViejo = `./uploads/ususarios/${ ususario.img }`;
            borrarImagen( pathViejo );

            ususario.img = nombreArchivo;
            await ususario.save();
            return true;

        case 'medicos':
            const medico = await Medico.findById(id);
            if ( !medico ) {
                return false;
            }

            pathViejo = `./uploads/medicos/${ medico.img }`;
            borrarImagen( pathViejo );

            medico.img = nombreArchivo;
            await medico.save();
            return true;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if ( !hospital ) {
                return false;
            }

            pathViejo = `./uploads/hospitales/${ hospital.img }`;
            borrarImagen( pathViejo );

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
    
        default:
        break;
    }

}

module.exports = {
    actualizarImagen
}