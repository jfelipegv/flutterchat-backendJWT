const express = require('express');
const path = require('path');
require('dotenv').config();

require('./database/config').dbConnection();
 //app de Express
const app = express();

// Lectura y parseo del body
app.use(express.json());

//Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');


//path público
const publicPath = path.resolve(__dirname, 'public');
app.use( express.static( publicPath));

//Mis Rutas
app.use('/api/login', require('./routes/auth'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/mensajes', require('./routes/mensajes'));

server.listen(process.env.PORT, ( err )=> {
    if ( err ) throw new Error(err);
    console.log('Servidor corriendo en puerto : ', process.env.PORT);
} )