const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Se necesita el nombre']
    },


     primer_apellido: {
         type: String,
        required: [true, 'Se necesita el primer apellido']        
    },


    segundo_apellido: {
            type: String,
            required: [true, 'Se necesita el segundo apellido']
        },

    edad: {
           type: Number,
        required: true
    },
    curp: {
        type: String,
        required: false
    },

    telefono: {
        type: Number,
        required: false
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    activo:{
    type:Boolean,
    default:true
    }

});

module.exports = mongoose.model('Usuario', usuarioSchema);