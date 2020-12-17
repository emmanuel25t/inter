const express = require('express');
const _ = require('underscore');
const app = express();
const departamento = require('../models/departamento');

app.get('/departamento', (req, res) => {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 300;

    Departamento.find({}) 
        .skip(Number(desde))
        .limit(Number(hasta))
        .populate('usuario', '_id')
        .exec((err, departamento) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Error en la lista de departamento',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'departamentos listados con exito',
                conteo: departamento.length,
                departamento
            });
        });

});

app.get('/departamento/:id', (req, res) => {

    let idDepartamento = req.params.id;

    Departamento.findById({ _id: idDepartamento })
        .populate('usuario', '_id')
        .exec((err, departamento) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Error al listar los Departamentos',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Departamento listado con exito',
                conteo: departamento.length,
                departamento
            });
        });

});

app.post('/departamento', (req, res) => {
    let cat = new Departamento({
        id_jefe_area: req.body.id_jefe_area,
        nombre: req.body.nombre,
        numero_empleados: req.body.numero_empleados,
        extension_telefonica: req.body.extension_telefonica,
        activo: req.body.activo
    });

    cat.save((err, catDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al insertar una departamento',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Departamento insertado con exito',
            catDB
        });
    });
});

app.put('/departamento/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['id_jefe_area', 'nombre', 'numero_empleados', 'extension_telefonica', 'activo']);

    Departamento.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
        (err, catDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Error al momento de actualizar',
                    err
                });
            }
            res.json({
                ok: true,
                msg: 'Departamento actualizado con exito',
                catDB
            });
        });
});

app.delete('/departamento/:id', function(req, res) {

    let id = req.params.id;

    Departamento.findByIdAndRemove(id, { context: 'query' }, (err, catDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al eliminar',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Departamento eliminado con exito',
            catDB

        });

    });

});

module.exports = app

