const { response } = require('express');
const Usuario = require('../models/usuario');

const getUsuarios = async ( req, res = response ) => {

    const desde = Number( req.query.desde ) || 0; // se puede enviar por parametros el desde= localhost:3000/api/usuarios?desde=3

    const usuarios = await Usuario
        .find({ _id: { $ne: req.uid } })// retornar todos los ids que sean diferentes al uid. 
        .sort('-online')// ordenar por estado online
        .skip(desde) // traer usuarios desdse el registro $desde
        .limit(20)

    
    res.json({
        ok: true,
        usuarios,
    })
}



module.exports = {
    getUsuarios
}