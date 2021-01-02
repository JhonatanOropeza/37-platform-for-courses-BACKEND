const { Schema, model } = require('mongoose');

const cursoSchema = new Schema({
    nombre: String,
    categoria: String,
    linkOfIcon: String,
    calificacion: 0,
    descripcion: String,
    temario: [],
    linkVideo: String,
});

cursoSchema.set('toObject', { virtuals: true });
cursoSchema.set('toJSON', { virtuals: true });

cursoSchema.virtual('NIVELES',{
    ref: 'Nivel',
    localField: '_id',
    foreignField: 'idCurso',
    justOne: false
});

module.exports = model('Curso', cursoSchema);