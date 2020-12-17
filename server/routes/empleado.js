const express = require('express');
const _ = require('underscore');
const app = express();
const Empleado = require('../models/empleado');

app.get('/empleado', function(req, res) {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 300;

    Empleado.find({ disponible: true }) 
        .skip(Number(desde))
        .limit(Number(hasta))
        .populate('usuario', '_id')
        .populate('departamento', '_id')
        .exec((err, empleado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de consultar',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Empleados listados con exito',
                conteo: empleado.length,
                empleado
            });
        });
});

app.get('/empleado/:id', function(req, res) {

    let idEmpleado = req.params.id;

    Empleado.findById({ _id: idEmpleado })
        .populate('usuario', '_id')
        .populate('departamento', '_id')
        .exec((err, empleado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Error al consultar',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Empleados listados con exito',
                conteo: empleado.length,
                empleado
            });
        });
});

app.post('/empleado', (req, res) => {
    let pro = new empleado({
        nombre_del_puesto: req.body.nombre_del_puesto,
        anios_servicio: req.body.anios_servicio,
        hora_entrada: req.body.hora_entrada,
        hora_salida: req.body.hora_salida
    });

    pro.save((err, proDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al crear empleado',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Empleado insertado con exito',
            proDB
        });
    });
});


app.put('/empleado/:id', function(req, res) {
    let _id = req.params._id;
    let body = _.pick(req.body, ['id_usuario', 'id_departamento', 'nombre_del_puesto', 'anios_servicio', 'hora_entrada', 'hora_salida', 'activo']);

    Empleado.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
        (err, proDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Error al actualizar',
                    err
                });
            }
            res.json({
                ok: true,
                msg: 'Empleado actualizado con exito',
                empleado: proDB
            });
        });
});

app.delete('/empleado/:id', function(req, res) {

    let id = req.params.id;

    Producto.findByIdAndUpdate(id, { disponible: false }, { new: true, runValidators: true, context: 'query' }, (err, proDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al eliminar',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Empleado eliminado con exito',
            proDB

        });
    });
});

module.exports = app;