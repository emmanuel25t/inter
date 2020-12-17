const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let empleadoSchema = new Schema({

    id_usuario: {
        type: ObjectId,
        required: true
    },    


    id_departamento: {
        type: ObjectId,
        required: true
    },

nombre_del_puesto: {
    type: string,
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

module.exports = mongoose.model('empleado', empleadoSchema);