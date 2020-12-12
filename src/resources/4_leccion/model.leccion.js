const { Schema, model} = require('mongoose');

const leccionSchema = new Schema({
    nombre: String,
    estatus: false,
    calificacion: 0,
    idNivel: {type: Schema.ObjectId, ref: 'Nivel'}
});

leccionSchema.set('toObject', { virtuals: true });
leccionSchema.set('toJSON', { virtuals: true });

leccionSchema.virtual('MATERIALES',{
    ref: 'Material',
    localField: '_id',
    foreignField: 'idLeccion',
    justOne: false
});

module.exports = model('Leccion', leccionSchema);