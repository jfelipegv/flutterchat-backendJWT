const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response ) => {

    const { email, password } = req.body;

    try {
        const existeEmail =  await Usuario.findOne({email});
        if( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

    const usuario = new Usuario( req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);


    await usuario.save();

    //Generar mi JWT
    const token = await generarJWT( usuario.id);

    res.json({
        ok: true,
        usuario,
        token
    });
}

const login = async (req, res = response)=> {
    const { email, password } = req.body;


    try {
        const usuarioDB = await Usuario.findOne({ email });
        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Validar password
        const validPassword = bcrypt.compareSync( password, usuarioDB.password);
        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es valida'
            });
        }

            //Generar JWt
            const token = await generarJWT(usuarioDB.id);

            res.json({
                ok: true,
                usuario:usuarioDB,
                token
            });

            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    ok: false,
                    msg: 'Hable con el administrador'
                });
            }


            
        }

        const renovarToken = async (req, res = response) => {
            
            const uid = req.uid;
            // Generar un nuevo JWT
            const token = await generarJWT( uid );

            // Obtener el usuario por el UID
            const usuario = await Usuario.findById( uid );


            res.json({
                ok: true,
                usuario,
                token
            });
        }

        module.exports = {
            crearUsuario,
            login,
            renovarToken
        }