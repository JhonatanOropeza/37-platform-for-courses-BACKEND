const { Schema, model} = require('mongoose');

const nivelSchema = new Schema({
    nombre: String,
    estatus: false,
    idCurso: {type: Schema.ObjectId, ref: 'Curso'}
});

nivelSchema.set('toObject', { virtuals: true });
nivelSchema.set('toJSON', { virtuals: true });

nivelSchema.virtual('LECCIONES',{
    ref: 'Leccion',
    localField: '_id',
    foreignField: 'idNivel',
    justOne: false
});

module.exports = model('Nivel', nivelSchema);