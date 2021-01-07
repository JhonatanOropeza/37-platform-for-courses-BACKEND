const {Schema, model} = require('mongoose');

const materialAlumnoSchema = new Schema({
    idUser: {type: Schema.ObjectId, ref: 'User'},
    idMaterial: {type: Schema.ObjectId, ref: 'Material'},
    calificacionExamen: 0
});

module.exports = model('materialAlumno', materialAlumnoSchema);