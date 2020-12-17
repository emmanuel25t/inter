const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let empleadoSchema = new Schema({

nombre_del_puesto: {
    type: String,
    required: true
},

anios_servicio: {
    type: Number,
    required: true
},

hora_entrada: {
    type: Number,
    required: true
},

hora_salida: {
    type: Number,
    required: true
},

activo: {
    type:Boolean,
    default:true
},

});

module.exports = mongoose.model('Empleado', empleadoSchema);