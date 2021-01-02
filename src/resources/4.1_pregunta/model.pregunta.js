const { Schema, model } = require('mongoose');

const preguntaSchema = new Schema({
    pregunta: String,
    reCorrecta: String,
    re1: String,
    re2: String,
    re3: String,
    re4: String,
    idLeccion: { type: Schema.ObjectId, ref: 'Leccion' }
});

module.exports = model('Pregunta', preguntaSchema);