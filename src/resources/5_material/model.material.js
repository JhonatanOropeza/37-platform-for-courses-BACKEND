const { Schema, model} = require('mongoose');

const materialSchema = new Schema({
    nombre: String,
    estatus: false,
    tipo: 0,
    idLeccion: {type: Schema.ObjectId, ref: 'Leccion'}
})

module.exports = model('Material', materialSchema);