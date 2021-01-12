const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config')

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use( express.json() );

// Base de datos
dbConnection();

//console.log( process.env );

// Rutas
app.use('/api/login', require('./Routers/auth'));
app.use('/api/usuarios', require('./Routers/usuarioRouter'));

//Pxds4dqzJWNjNjNb - pass

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto: ' + process.env.PORT);
});