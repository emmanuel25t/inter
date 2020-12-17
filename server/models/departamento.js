const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let departamentoSchema = new Schema({

    id_jefe_de_area: {
        type: Schema.Types.ObjectId,
        required: true
  },

  nombre: {
    type: String,
    required: true
},

numero_empleados: {
    type: Number,
    required: true
},

extension_telefonica: {
    type: Number,
    required: true
},

activo: {
    type: Boolean,
    default: true,
    required: true
},

});

module.exports = mongoose.model('Departamento', departamentoSchema);