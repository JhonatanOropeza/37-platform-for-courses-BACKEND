const { Schema, model } = require('mongoose');

const materialSchema = new Schema({
    nombre: String,
    estatus: false,
    tipo: 0,
    linkOfMaterial: String,
    idLeccion: { type: Schema.ObjectId, ref: 'Leccion' }
})

materialSchema.set('toObject', { virtuals: true });
materialSchema.set('toJSON', { virtuals: true });

materialSchema.virtual('estado')
    .get(function () {
        if (this._estado == null) {
            return -2;
        }
        return this._estado;
    })
    .set(function (v) {
        this._estado = v;
    });

module.exports = model('Material', materialSchema);