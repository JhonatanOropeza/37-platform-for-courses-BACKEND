const { Schema, model} = require('mongoose');

const inscripcionSchema = new Schema({
    alumno: { type: Schema.ObjectId, ref: 'User'},
    curso: { type: Schema.ObjectId, ref: 'Curso'},
    fechaInscripcion: String
})

module.exports = model('Inscripcion', inscripcionSchema);