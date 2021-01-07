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

cursoSchema.virtual('NIVELES', {
    ref: 'Nivel',
    localField: '_id',
    foreignField: 'idCurso',
    justOne: false
});

cursoSchema
    .virtual('puntuacion')
    .get(function () {
        if (this._puntuacion == null) {
            return 0;
        }
        return this._puntuacion;
    })
    .set(function (v) {
        this._puntuacion = v;
    });

cursoSchema
    .virtual('evalPresentadas')
    .get(function () {
        if (this._evalPresentadas == null) {
            return 0;
        }
        return this._evalPresentadas;
    })
    .set(function (v) {
        this._evalPresentadas = v;
    });

cursoSchema
    .virtual('evalAcreditadas')
    .get(function () {
        if (this._evalAcreditadas == null) {
            return 0;
        }
        return this._evalAcreditadas;
    })
    .set(function (v) {
        this._evalAcreditadas = v;
    });

module.exports = model('Curso', cursoSchema);