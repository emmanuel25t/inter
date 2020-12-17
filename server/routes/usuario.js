const express = require('express');
const _ = require('underscore');
const Usuario = require('../models/usuarios');
const app = express();

app.get('/usuario', function(req, res) {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 300;


    Usuario.find({ activo: true }) 
    .skip(Number(desde))
    .limit(Number(hasta))
    .exec((err, usuarios) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al mandar a llamar',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Usuarios listados con exitos',
            conteo: usuarios.length,
            usuarios
        });
    });
});



app.get('/usuario/:id', function(req, res) {

    let idUsuario = req.params.id;

    Usuario.findById({ _id: idUsuario })
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Error en actualizar',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'usuario listados con exito',
                conteo: usuarios.length,
                usuarios
            });
        });
});



app.post('/usuario', function(req, res) {
    let body = req.body;
    let usr = new Usuario({
        nombre: body.nombre,
        primer_apellido: body.primer_apellido,
        segundo_apellido: body.segundo_apellido,
        edad: body.edad,
        curp: body.curp,
        telefono: body.telefono,
        email: body.email
    });

    usr.save((err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Usuario insertado con exito',
            usrDB
        });
    });
});


app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'primer_apellido', 'segundo_apellido','edad', 'curp', 'telefono', 'email']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
        (err, usrDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Error al actualizar',
                    err
                });
            }
            res.json({
                ok: true,
                msg: 'Usuario actualizado con exito',
                usuario: usrDB
            });
        });
});

app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;
    console.log(req.params);
    console.log(id);

    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al eliminar',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Usuario eliminado con exito',
            usrDB

        });
    });
});

module.exports = app;